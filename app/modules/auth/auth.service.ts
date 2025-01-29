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
      if (!email) {
        throw new Error("Please enter your email");
      }
      if (!password) {
        throw new Error("Please enter your password");
      }

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

      return await this.magicLinkLogin(input);
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async magicLinkLogin(input: { email: string; password: string }) {
    try {
      const { email, password } = input;

      // Find user by email only
      const user = await dbQuery.contact.findFirst({
        where: { email },
      });

      // If user doesn't exist, throw an error
      if (!user) {
        throw new Error("Invalid email or password");
      }

      // If user is not found, return an error
      if (!user || !user.password) {
        throw new Error("Invalid email or password");
      }
      // Log passwords to debug
      console.log("Entered Password:", password);
      console.log("Stored Hash:", user.password);
      // Verify password
      const isPasswordValid = verifyPassword(password, user.password as string);
      if (!isPasswordValid) {
        throw new Error("Invalid email or password");
      }

      // Remove password before returning the user object
      const { password: _, ...rest } = user;

      const userJWT = await this.EncryptData({ ...rest, role: "client" });

      return { client: rest, token: userJWT, apiToken: null };
    } catch (error: any) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
}
