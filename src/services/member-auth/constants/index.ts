import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */

export const WEBSITE = publicRuntimeConfig.WEBSITE;
export const MEMBER_SECRET_KEY = publicRuntimeConfig.MEMBER_SECRET_KEY;

export const NEXTAUTH_URL = serverRuntimeConfig.NEXTAUTH_URL;
export const MEMBER_API_URL = serverRuntimeConfig.MEMBER_API_URL;
export const MONGODB_URI = serverRuntimeConfig.MONGODB_URI;
export const APP_SECRET_KEY = serverRuntimeConfig.APP_SECRET_KEY;

/* --------------------------------- LINE --------------------------------- */
export const LINE_CLIENT_ID = serverRuntimeConfig.LINE_CLIENT_ID;
export const LINE_CLIENT_SECRET = serverRuntimeConfig.LINE_CLIENT_SECRET;

/* --------------------------------- FACEBOOK --------------------------------- */
export const FACEBOOK_CLIENT_ID = serverRuntimeConfig.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = serverRuntimeConfig.FACEBOOK_CLIENT_SECRET;

/* --------------------------------- GOOGLE --------------------------------- */
export const GOOGLE_CLIENT_ID = serverRuntimeConfig.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = serverRuntimeConfig.GOOGLE_CLIENT_SECRET;

/* --------------------------------- LINKEDIN --------------------------------- */
export const LINKED_IN_CLIENT_ID = serverRuntimeConfig.LINKED_IN_CLIENT_ID;
export const LINKED_IN_CLIENT_SECRET = serverRuntimeConfig.LINKED_IN_CLIENT_SECRET;
