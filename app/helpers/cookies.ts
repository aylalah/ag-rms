import { appDecryptData } from "@helpers/validation";
import { createCookie } from "@remix-run/node";

export const appCookie = createCookie("rating-management-system", {
  maxAge: Number(process.env.APP_TIMEOUT) || 3600,
  httpOnly: true,
  secure: true,
  priority: "high",
  sameSite: "lax",
});

export const settingsCookie = createCookie("rms-settings", {
  maxAge: 3600 * 24 * 90, // 90 days
  httpOnly: true,
  secure: true,
  priority: "low",
  sameSite: "lax",
});

export const acceptCookie = createCookie("rms-accept-cookie", {
  maxAge: 3600 * 24 * 365 * 5, // 5 years
  httpOnly: true,
  secure: true,
  priority: "high",
  sameSite: "lax",
});

export const validateAcceptedCookie = async (request: Request) => {
  if (request.headers.get("cookie")) {
    const cookie = request.headers.get("cookie");
    if (cookie) {
      const data = await acceptCookie.parse(cookie);
      if (data === "true") return true;
    }
  }
  return false;
};

export const validateCookie = async (request: Request) => {
  let token = "" as string;
  let user = null as User | null;
  let client = null as Contact | null;
  let apiToken = "" as string;

  try {
    if (request.headers.get("cookie")) {
      const cookie = request.headers.get("cookie");
      const data = await appCookie.parse(cookie);
      const cookieData = JSON.parse(data) || {};
      token = cookieData.token;
      user = cookieData.user;
      client = cookieData.client;
      apiToken = cookieData.apiToken;
    }

    return { token, user: user, client, apiToken };
  } catch (e) {
    return { token, user, apiToken };
  }
};

export const validateSettingsCookie = async (request: Request) => {
  let payload = {} as { theme: "dark" | "light" | null };
  try {
    if (request.headers.get("cookie")) {
      const cookie = request.headers.get("cookie");

      const data = await settingsCookie.parse(cookie);
      payload = data;
    }
    return { theme: payload.theme || "light" };
  } catch (e) {
    return { theme: "light" };
  }
};
