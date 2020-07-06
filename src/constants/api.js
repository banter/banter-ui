const CONSTANTS = {
  API_BASE_URLS: {
    DEVELOPMENT: 'http://localhost:8080',
    PRODUCTION: 'https://api.banteraudio.com'
  },
  REDIRECT_URLS: {
    DEVELOPMENT: 'http://localhost:8081',
    PRODUCTION: 'https://banteraudio.com'
  }
}
const ENV = process.env.NODE_ENV.toUpperCase();

const API = {
  OAUTH_BASE_URL: CONSTANTS.API_BASE_URLS[ENV],
  BASE_URL: `${CONSTANTS.API_BASE_URLS[ENV]}/v1/`,
  REDIRECT_URL: CONSTANTS.REDIRECT_URLS[ENV],
  TOPICS: "topics/",
  GENRES: "genres/",
  TRENDING: "trending/",
  COLLECTIONS: "collections/",
  USERS: "users/",
  ME: "me",
  LOGIN: "login",
  REGISTER: "register",
  LOGOUT: `logout?redirect_uri=${CONSTANTS.REDIRECT_URLS[ENV]}`,
};

export default API;
