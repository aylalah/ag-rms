import axios from 'axios';
import { appEncryptData } from '@helpers/validation';
import { dbQuery } from '@helpers/prisma';
import { MainClass } from '@modules/services/main.service';

export class AuthClass extends MainClass {
  private async EncryptData(data: any) {
    return await appEncryptData(data);
  }

  public async login(input: { email: string; password: string }) {
    try {
      const { email, password } = input;
      const isAgustoMail = email.includes('@agusto.com');
      const endPoint = process.env.AGUSTO_SERVICES_URL;

      if (isAgustoMail) {
        const { data } = await axios.post(`${endPoint}/auth/login`, { corporate_email: email, password });
        const { token, user } = data || {};

        if (data?.status === 400) throw new Error(data?.message);

        const Me = await axios.get(`${endPoint}/users/getStaffByempId/${user?.employee_id.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userJWT = await this.EncryptData({
          ...user,
          unit: Me?.data?.data?.unit,
          role: Me?.data?.data?.isAdmin ? 'admin' : 'user',
        });
        return { user: Me?.data?.data as User, apiToken: token, token: userJWT, client: null };
      }

      const user = await dbQuery.client.findFirst({
        where: { email, password: input.password },
      });

      if (!user) throw new Error('User not found');
      const { password: userPassword, ...rest } = user;

      //six digit token
      const magicToken = Math.floor(100000 + Math.random() * 900000).toString();
      await dbQuery.client.update({ where: { id: user.id }, data: { magicToken } });

      //send magic link to user email
      sendEmailService({
        From: '',
        To: email,
        Subject: 'Agusto Rating System Login Token',
        HtmlBody: `
        <h2>Agusto Rating Mgt System - Login Token</h2>
        <p>Hello ${email},</p>
        <p>Please see your six digit token below</p>
        <h2>${magicToken}</h2>

        <p>Thank you</p>
        <p>Agusto & Co.</p>`,

        TextBody: `Hello ${email}, Please see your six digit token below ${magicToken}`,
      });

      return { message: 'Login link sent to your email', user: rest, apiToken: null, client: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async magicLinkLogin(input: { email: string; token: string }) {
    try {
      const { email, token } = input;
      const user = await dbQuery.client.findFirst({
        where: { magicToken: token, email },
      });

      if (!user) throw new Error('Wrong token or email. Please use the correct token sent to your email');
      //await dbQuery.client.update({ where: { id: user.id }, data: { magicToken: null } });

      const { password, ...rest } = user;
      const userJWT = await this.EncryptData({ ...rest, role: 'client' });

      return { client: rest, token: userJWT, apiToken: null };
    } catch (error: any) {
      return { error: error?.message };
    }
  }
}
