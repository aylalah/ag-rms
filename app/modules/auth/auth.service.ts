import axios from "axios";
import { appEncryptData } from "@helpers/validation";
import { dbQuery } from "@helpers/prisma";
import { MainClass } from "@modules/services/main.service";

interface AuthResponse {
  token?: any;
  user?: User;
  error?: string;
  apiToken?: string | null;
  client?: any | null;
  message?: string;
}

export class AuthClass extends MainClass {
  private async EncryptData(data: any) {
    return await appEncryptData(data);
  }

  public async login(input: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const { email, password } = input;
      const isAgustoMail = email.includes("@agusto.com");
      const endPoint = process.env.AGUSTO_SERVICES_URL;

      // if (!navigator.onLine) {
      //   return {
      //     error:
      //       "No internet connection. Please check your network and try again.",
      //   };
      // }

      if (!email) {
        return { error: "Please enter your email" };
      }
      if (!password) {
        return { error: "Please enter your password" };
      }

      if (isAgustoMail) {
        try {
          // Inner try-catch for Agusto API errors
          const { data } = await axios.post(`${endPoint}/auth/login`, {
            corporate_email: email,
            password,
          });

          const { token, user } = data || {};

          if (data?.status === 400) {
            return { error: data?.message }; // Return consistent object structure
          }

          const Me = await axios.get(
            `${endPoint}/users/getStaffByempId/${user?.employee_id?.toString()}`,
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
        } catch (agustoApiError: any) {
          return { error: agustoApiError.message }; // Handle Agusto API errors specifically
        }
      }

      return await this.magicLinkLogin(input);
    } catch (error: any) {
      return { error: error.message };
    }
  }

  public async magicLinkLogin(input: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const { email, password } = input;

      // Find user by email only
      const user = await dbQuery.contact.findFirst({
        where: { email },
      });

      // If user doesn't exist, throw an error
      if (!user) {
        return { error: "Invalid email or password" }; // Consistent object structure
      }

      // If user is not found, return an error
      if (!user || !user.password) {
        return { error: "Invalid email or password" }; // Consistent object structure
      }
      // // Log passwords to debug
      // console.log("Entered Password:", password);
      // console.log("Stored Hash:", user.password);
      // Verify password
      const isPasswordValid = verifyPassword(password, user.password as string);
      if (!isPasswordValid) {
        return { error: "Invalid email or password" }; // Consistent object structure
      }

      // Remove password before returning the user object
      const { password: _, ...rest } = user;

      const userJWT = await this.EncryptData({ ...rest, role: "client" });

      return { client: rest, token: userJWT, apiToken: null };
    } catch (error: any) {
      return { error: error?.message || "Something went wrong" }; // Consistent error return
    }
  }
}
