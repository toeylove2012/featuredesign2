import * as CryptoJS from 'crypto-js';
import { APP_SECRET_KEY } from 'services/member-auth/constants';

export const decryption = (payloadData: any) => {
  // console.log('decryption', APP_SECRET_KEY);
  return JSON.parse(CryptoJS.AES.decrypt(payloadData, APP_SECRET_KEY).toString(CryptoJS.enc.Utf8));
};

export const encryption = (payloadData: any) => {
  // console.log('encryption', APP_SECRET_KEY);
  return CryptoJS.AES.encrypt(JSON.stringify(payloadData), APP_SECRET_KEY).toString();
};
