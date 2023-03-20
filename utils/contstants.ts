export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const DEFAULT_URL = IS_PRODUCTION
  ? 'https://tiny0x.com'
  : 'http://localhost:3000';
export const AUTH_COOKIE = 'thirdweb_auth_token';
export const NFT_ADDRESS_PROFILE = '';
export const NFT_ADDRESS_LINK = '';
export const DEFAULT_TAKE = 10;
export const MAX_CHARACTERS = 250;
export const PRIMARY_PURPLE = '#6741d9';
export const PRIMARY_GRAPE = '#c2255c';
