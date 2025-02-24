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
      const endPoint = process.env.AGUSTO_SERVICES;

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
            email: email,
            password,
          });
          console.log(data, "data");
          const { token, ...user } = data?.data || {};

          const Me = await axios.get(
            `${endPoint}/users/${user?.id?.toString()}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const userJWT = await this.EncryptData({
            user,
            unit: Me?.data?.data?.department?.name,
            role: Me?.data?.data?.isAdmin ? "admin" : "user",
          });

          return {
            user: Me?.data?.data
              ? ({
                  id: Me.data.data.id || "",
                  employee_id: Me.data.data.employee_id || "",
                  role: Me.data.data.role?.name || "",
                  firstname: Me.data.data.firstname || "",
                  lastname: Me.data.data.lastname || "",
                  corporateEmail: Me.data.data.corporate_email || "",
                  unit: Me.data.data.department?.name || "",
                  departmentRole:
                    Me.data.data.department_role ||
                    Me.data.data.position?.name ||
                    "",
                  image: Me.data.data.image || "",
                  levelModel: {
                    name: Me.data.data.position?.name || "",
                  },
                  unitModel: {
                    name: Me.data.data.department?.name || "",
                  },
                  ...Object.fromEntries(
                    Object.entries(Me.data.data).filter(
                      ([key]) =>
                        ![
                          "id",
                          "employee_id",
                          "role",
                          "firstname",
                          "lastname",
                          "corporate_email",
                          "department_role",
                          "position",
                          "image",
                          "department",
                          "unit",
                        ].includes(key)
                    )
                  ),
                } as User)
              : undefined,
            apiToken: token,
            token: userJWT,
            client: null,
          };
        } catch (agustoApiError: any) {
          console.log(agustoApiError, "error");
          return {
            error:
              agustoApiError.response?.data?.message || "something went wrong",
          }; // Handle Agusto API errors specifically
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

      if (user.password !== password) {
        return { error: "Invalid email or password" }; // Consistent object structure
      }

      // Remove password before returning the user object
      const { password: _, ...rest } = user;

      const userJWT = await this.EncryptData({ ...rest, role: "client" });

      return { client: rest as Contact, token: userJWT, apiToken: null };
    } catch (error: any) {
      return { error: error?.message || "Something went wrong" }; // Consistent error return
    }
  }
}
