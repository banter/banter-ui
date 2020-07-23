const CONSTANTS = {
  API_BASE_URLS: {
    LOCAL: 'http://localhost:8080',
    DEVELOPMENT: 'https://api.banteraudio.com',
    PRODUCTION: 'https://api.banteraudio.com',
  },
};
const ENV = process.env.NODE_ENV.toUpperCase();

const API = {
  OAUTH_BASE_URL: CONSTANTS.API_BASE_URLS[ENV],
  BASE_URL: `${CONSTANTS.API_BASE_URLS[ENV]}/v1/`,
  REDIRECT_URL: window.location.origin,
  TOPICS: 'topics/',
  GENRES: 'genres/',
  TRENDING: 'trending/',
  COLLECTIONS: 'collections/',
  USERS: 'users/',
  ME: 'me',
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: `logout?redirect_uri=${window.location.origin}`,
};

export default API;
