import { AgustoServicesSdk } from '@helpers/config';
import { appEncryptData } from '@helpers/validation';
import { dbQuery } from '@helpers/prisma';
import { MainClass } from '@modules/services/main.service';

export class AuthClass extends MainClass {
  private async EncryptData(data: any) {
    return await appEncryptData(data);
  }

  public async login(input: { email: string; password: string }) {
    console.log(input.email, input.password);
    try {
      const { email } = input;
      const isAgustoMail = email.includes('@agusto.com');

      if (isAgustoMail) {
        const { user, token, error } = await AgustoServicesSdk.auth.Login({ email, password: input.password });

        if (error) throw new Error(error);
        const Me = (await AgustoServicesSdk.auth.Me({ token })) as any;

        if (Me.error) throw new Error(Me.error);

        const userJWT = await this.EncryptData({ ...user, unit: Me?.data?.unit });
        return { user: Me.data as User, apiToken: token, token: userJWT };
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
