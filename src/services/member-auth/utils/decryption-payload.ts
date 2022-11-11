import * as CryptoJS from 'crypto-js';
import { MEMBER_SECRET_KEY } from 'services/member-auth/constants';

export const decryptionClient = (payloadData: any) => {
  // console.log('decryptionClient', APP_SECRET_KEY);
  return JSON.parse(CryptoJS.AES.decrypt(payloadData, MEMBER_SECRET_KEY).toString(CryptoJS.enc.Utf8));
};

export const encryptionClient = (payloadData: any) => {
  // console.log('encryptionClient', APP_SECRET_KEY);
  return CryptoJS.AES.encrypt(JSON.stringify(payloadData), MEMBER_SECRET_KEY).toString();
};
