import { AgustoServicesSdk } from '@helpers/config';
import { appEncryptData } from '@helpers/validation';
import { dbQuery } from '@helpers/prisma';
import { MainClass } from '@modules/services/main';

export class AuthClass extends MainClass {
  public async login(input: { email: string; password: string }) {
    try {
      const { email } = input;
      const isAgustoMail = email.includes('@agusto.com');

      if (isAgustoMail) {
        const { user, token, error } = await AgustoServicesSdk.auth.Login({ email, password: input.password });
        if (error) throw new Error(error);
        return { user, token };
      }

      const user = await dbQuery.client.findFirst({
        where: { companyEmail: email, password: input.password },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const { password: userPassword, ...rest } = user;

      const userJWT = await appEncryptData({
        ...rest,
        id: user?.id,
        email: user?.companyEmail,
        roles: user?.role,
        createdAt: user?.createdAt,
      });

      this.LogAction({
        table: 'user',
        user: `${user?.id}`,
        action: 'login',
        prevDocs: '',
        newDocs: JSON.stringify(user),
      });

      console.log('User');

      return { user: rest, token: userJWT };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
