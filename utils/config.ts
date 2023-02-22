export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const DEFAULT_URL = IS_PRODUCTION
  ? 'https://tiny0x.com'
  : 'http://localhost:3000';
export const AUTH_COOKIE = 'thirdweb_auth_token';
