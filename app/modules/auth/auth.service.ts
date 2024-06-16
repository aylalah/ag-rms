import axios from "axios";
import { appEncryptData } from "@helpers/validation";
import { dbQuery } from "@helpers/prisma";
import { MainClass } from "@modules/services/main.service";

export class AuthClass extends MainClass {
  private async EncryptData(data: any) {
    return await appEncryptData(data);
  }

  public async login(input: { email: string; password: string }) {
    try {
      const { email, password } = input;
      const isAgustoMail = email.includes("@agusto.com");
      const endPoint = process.env.AGUSTO_SERVICES_URL;

      if (isAgustoMail) {
        const { data } = await axios.post(`${endPoint}/auth/login`, {
          corporate_email: email,
          password,
        });
        const { token, user } = data || {};

        if (data?.status === 400) throw new Error(data?.message);

        const Me = await axios.get(
          `${endPoint}/users/getStaffByempId/${user?.employee_id.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userJWT = await this.EncryptData({
          ...user,
          unit: Me?.data?.data?.unit,
          role: Me?.data?.data?.isAdmin ? "admin" : "user",
        });

        return {
          user: Me?.data?.data as User,
          apiToken: token,
          token: userJWT,
          client: null,
        };
      }

      const user = await dbQuery.contact.findFirst({
        where: { email, password: input.password },
        include: { clientModel: true },
      });

      if (!user) throw new Error("User not found");
      const { password: userPassword, ...rest } = user;

      //six digit token
      const magicToken = Math.floor(100000 + Math.random() * 900000).toString();
      await dbQuery.contact.update({
        where: { id: user.id },
        data: { magicToken },
      });

      //send magic link to user email
      // <h2>Agusto & Co.s Rating Mgt System - Login Token</h2>
      sendEmailService({
        From: "info@agusto.com",
        To: email,
        Subject: "Agusto & Co's Rating System Login Token",
        HtmlBody: `
        <p>Hello ${user?.fullName},</p>
        <p>Please find below your six digit token</p>
        <h2>${magicToken}</h2>

        <p>Thank you</p>
        <p>Agusto & Co.</p>`,

        TextBody: `Hello ${user?.fullName}, Please find below your six digit token ${magicToken}`,
      });

      return {
        message: "Login link sent to your email",
        user: rest,
        apiToken: null,
        client: null,
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async magicLinkLogin(input: { email: string; token: string }) {
    try {
      const { email, token } = input;
      const user = await dbQuery.contact.findFirst({
        where: { magicToken: token, email },
      });

      if (!user)
        throw new Error(
          "Wrong token or email. Please use the correct token sent to your email"
        );
      await dbQuery.contact.update({
        where: { id: user.id },
        data: { magicToken: null },
      });

      const { password, ...rest } = user;
      const userJWT = await this.EncryptData({ ...rest, role: "client" });

      return { client: rest, token: userJWT, apiToken: null };
    } catch (error: any) {
      return { error: error?.message };
    }
  }
}
