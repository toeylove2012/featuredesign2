import getConfig from 'next/config';
import { IWebList } from 'utils/theme';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const WEB_NAME: keyof IWebList = publicRuntimeConfig.WEB_NAME;

export const APP_ENV: any = publicRuntimeConfig.NEXT_PUBLIC_APP_ENV || 'production';
export const API_URI: any = publicRuntimeConfig.NEXT_PUBLIC_API_URL || process.env.API_URL;
export const APP_URL: any = publicRuntimeConfig.NEXT_PUBLIC_APP_URL;
export const APP_IMG: any = publicRuntimeConfig.NEXT_PUBLIC_IMG_URL;
export const CLIENT_GSERVICE_URL = publicRuntimeConfig.NEXT_PUBLIC_GSERVICE_URL || process.env.NEXT_PUBLIC_GSERVICE_URL;
export const DEFAULT_COUNT_VIEW: number = publicRuntimeConfig.DEFAULT_COUNT_VIEW || process.env.DEFAULT_COUNT_VIEW;

export const TRUE_HITS_URL: any = publicRuntimeConfig.NEXT_PUBLIC_TRUE_HITS_URL || process.env.NEXT_PUBLIC_TRUE_HITS_URL;
export const IZOOTO_URL: any = publicRuntimeConfig.NEXT_PUBLIC_IZOOTO_URL || process.env.NEXT_PUBLIC_IZOOTO_URL;

export const CHECK_ADS: string = publicRuntimeConfig.CHECK_ADS || process.env.CHECK_ADS;

export const isProd: boolean = APP_ENV.toLowerCase() === 'production';
export const IS_NO_ROBOT_INDEX: boolean = !isProd;

/* ----------------------------- PUBLIC_RUNTIME ------------------------------ */
// GOPT
export const GOPT_ID: any = publicRuntimeConfig.NEXT_PUBLIC_GOPT_ID || process.env.NEXT_PUBLIC_GOPT_ID;
// GTM
export const GTM_ID: any = publicRuntimeConfig.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GTM_ID;
// GSERVICE
export const GSERVICE_URL: any = publicRuntimeConfig.NEXT_PUBLIC_GSERVICE_URL || 'https://gservice.thepeople.co';
// RECAPTCHA
export const RECAPTCHA_SITE_KEY: any = publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
// export const RECAPTCHA_SITE_KEY: any = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcdTJggAAAAAC33nvXmCPKBuYQ4iuuzjlsQaWed';
export const COUNTVIEW_SHOW_COUNT: any = process.env.NEXT_SERVER_COUNTVIEW_SHOW_COUNT || serverRuntimeConfig.NEXT_SERVER_COUNTVIEW_SHOW_COUNT || 0;

/* ----------------------------- SERVER_RUNTIME ------------------------------ */
// RECAPTCHA
export const RECAPTCHA_SECRET_KEY: any = serverRuntimeConfig.NEXT_SERVER_RECAPTCHA_SECRET_KEY;
// export const RECAPTCHA_SECRET_KEY: any = process.env.NEXT_SERVER_RECAPTCHA_SECRET_KEY || serverRuntimeConfig.NEXT_SERVER_RECAPTCHA_SECRET_KEY || '6LcdTJggAAAAAJY3bGfWgpunApstnbM9CaDsJn_D';
export const CONTENT_DEFAULT: any = process.env.NEXT_SERVER_DEFAULT_ID || serverRuntimeConfig.NEXT_SERVER_DEFAULT_ID || 0;

// REDIS
export const REDIS_URL: any = process.env.NEXT_SERVER_REDIS_URL || serverRuntimeConfig.NEXT_SERVER_REDIS_URL;
export const REDIS_PW = 'Nation#2021';
export const REDIS_PORT = 6379;
