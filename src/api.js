const BASE_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:8080/v1/' : 'https://api.banteraudio.com/v1/';

const API = {
  BASE_URL,
  TOPICS: "topics/",
  GENRES: "genres/",
  TRENDING: "trending/",
  COLLECTIONS: "collections/",
  USERS: "users/",
  ME: "me",
  LOGIN: "login/",
};

export default API;
