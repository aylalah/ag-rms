import bcryptjs from 'bcryptjs';
import CryptoJS from 'crypto-js';
/* eslint-disable @typescript-eslint/no-explicit-any */

const saltRounds = 10;

export const appEncryptData = async <T>(data: T) => {
  try {
    const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), `${process.env.COOKIE_SECRET}`).toString();
    return cipherText;
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const appDecryptData = async (data?: string) => {
  let result = null;

  try {
    if (!data) return result;
    const bytes = CryptoJS.AES.decrypt(data, `${process.env.COOKIE_SECRET}`);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    result = JSON.parse(originalText);

    return result;
  } catch (error) {
    return result;
  }
};

export const validateToken = async (token: string) => {
  let user = null;
  let agustoServiceToken = null;
  const decryptedData = await appDecryptData(token);

  if (decryptedData) {
    const storedData = JSON.parse(decryptedData);
    user = storedData.user as User;
    agustoServiceToken = storedData.token;
  }
  return { user, agustoServiceToken };
};

export const passwordPolicy = (password: string) => {
  //must be alphaNumeric and contain at least one special character
  //must contain at least one 8 characters
  //must contain at least one uppercase letter

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return passwordRegex.test(password);
};

export const hashPassword = (password: string) => {
  return bcryptjs.hashSync(password, saltRounds);
};

export const verifyPassword = (password: string, hash: string) => {
  return bcryptjs.compareSync(password, hash);
};

export const checkPasswordExpired = (lastPasswordChange: Date) => {
  const today = new Date();
  const passwordAge = today.getTime() - lastPasswordChange.getTime();
  const passwordAgeInDays = passwordAge / (1000 * 3600 * 24);
  return passwordAgeInDays > Number(process.env.PASSWORD_EXPIRY_DAYS || 30);
};
