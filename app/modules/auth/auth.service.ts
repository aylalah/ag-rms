import { AgustoServicesSdk } from '@helpers/config';
import { appEncryptData } from '@helpers/validation';
import { dbQuery } from '@helpers/prisma';
import { MainClass } from '@modules/services/main.service';
import axios from 'axios';

export class AuthClass extends MainClass {
  private async EncryptData(data: any) {
    return await appEncryptData(data);
  }

  public async login(input: { email: string; password: string }) {
    console.log(input.email, input.password);
    try {
      const { email, password } = input;
      const isAgustoMail = email.includes('@agusto.com');

      if (isAgustoMail) {
        const endPoint = process.env.AGUSTO_SERVICES_URL;
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
        return { user: Me?.data?.data as User, apiToken: token, token: userJWT };
      }

      const user = await dbQuery.client.findFirst({
        where: { companyEmail: email, password: input.password },
      });

      if (!user) throw new Error('User not found');
      const { password: userPassword, ...rest } = user;

      const userJWT = await this.EncryptData({
        id: user?.id,
        email: user?.companyEmail,
        role: user?.role,
        createdAt: user?.createdAt,
      });

      this.LogAction({
        table: 'user',
        user: `${user?.id}`,
        action: 'login',
        prevDocs: '',
        newDocs: JSON.stringify(user),
      });

      return { user: rest, token: userJWT };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
