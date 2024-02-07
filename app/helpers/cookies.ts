import { appDecryptData } from '@helpers/validation';
import { createCookie } from '@remix-run/node';

export const appCookie = createCookie('rating-management-system', {
  maxAge: Number(process.env.APP_TIMEOUT) || 3600,
  httpOnly: true,
  secure: true,
  priority: 'high',
  sameSite: 'strict',
});

export const settingsCookie = createCookie('rms-settings', {
  maxAge: 3600 * 24 * 90, // 90 days
  httpOnly: true,
  secure: true,
  priority: 'low',
  sameSite: 'strict',
});

export const validateCookie = async (request: Request) => {
  let token = '' as string;
  let user = null as User | null;
  try {
    if (request.headers.get('cookie')) {
      const cookie = request.headers.get('cookie');
      const data = await appCookie.parse(cookie);
      token = JSON.parse(data) as string;
      user = await appDecryptData(token);
    }

    return { token, user: user as User };
  } catch (e) {
    return { token, user };
  }
};

export const validateSettingsCookie = async (request: Request) => {
  let payload = {} as { theme: 'dark' | 'light' | null };
  try {
    if (request.headers.get('cookie')) {
      const cookie = request.headers.get('cookie');

      const data = await settingsCookie.parse(cookie);
      payload = data;
    }
    return { theme: payload.theme || 'light' };
  } catch (e) {
    return { theme: 'light' };
  }
};
