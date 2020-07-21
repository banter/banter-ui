const CONSTANTS = {
  API_BASE_URLS: {
    LOCAL: 'http://localhost:8080',
    DEVELOPMENT: 'https://api.banteraudio.com',
    PRODUCTION: 'https://api.banteraudio.com',
  },
  REDIRECT_URLS: {
    LOCAL: 'http://localhost:8081',
    DEVELOPMENT: 'https://banteraudio.com',
    PRODUCTION: 'https://banteraudio.com',
  },
};
const ENV = process.env.NODE_ENV.toUpperCase();
console.log(process.env);

const API = {
  OAUTH_BASE_URL: CONSTANTS.API_BASE_URLS[ENV],
  BASE_URL: `${CONSTANTS.API_BASE_URLS[ENV]}/v1/`,
  REDIRECT_URL: CONSTANTS.REDIRECT_URLS[ENV],
  TOPICS: 'topics/',
  GENRES: 'genres/',
  TRENDING: 'trending/',
  COLLECTIONS: 'collections/',
  USERS: 'users/',
  ME: 'me',
  LOGIN: `login?redirect_uri=${CONSTANTS.REDIRECT_URLS[ENV]}/home`,
  REGISTER: `register?redirect_uri=${CONSTANTS.REDIRECT_URLS[ENV]}/home`,
  LOGOUT: `logout?redirect_uri=${CONSTANTS.REDIRECT_URLS[ENV]}`,
};

export default API;
