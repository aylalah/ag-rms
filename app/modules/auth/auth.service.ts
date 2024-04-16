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
      const rootUrl = process.env.ROOT_URL;

      if (isAgustoMail) {
        const { data } = await axios.post(`${endPoint}/auth/login`, { corporate_email: email, password });
        const { token, user, error } = data || {};

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

      const magicToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const magicLink = `${rootUrl}/auth/magic-link?token=${magicToken}`;

      await dbQuery.client.update({ where: { id: user.id }, data: { magicToken } });

      console.log({ magicLink });
      //send magic link to user email
      sendEmailService({
        From: '',
        To: email,
        Subject: 'Agusto Rating App - Login Link',
        HtmlBody: `
        <h1>Agusto Rating Mgt System - Login Link</h1>
        <p>Hello ${email},</p>
        <p>Please click on the link below to login to your account</p>
        <a href="${magicLink}">Click here to login</a>

        <p>Thank you</p>
        <p>Agusto & Co.</p>`,

        TextBody: `Hello ${email},\nPlease click on the link below to login to your account\n${magicLink}`,
      });

      return { message: 'Login link sent to your email', user: rest, apiToken: null, client: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async magicLinkLogin(token: string) {
    try {
      const user = await dbQuery.client.findFirst({
        where: { magicToken: token },
      });

      if (!user) throw new Error('User not found');
      //await dbQuery.client.update({ where: { id: user.id }, data: { magicToken: null } });

      const { password, ...rest } = user;
      const userJWT = await this.EncryptData({ ...rest, role: 'client' });

      return { client: rest, token: userJWT, apiToken: null };
    } catch (error: any) {
      return { error: error?.message };
    }
  }
}
