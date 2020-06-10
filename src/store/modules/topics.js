import axios from "axios";
import API from "../../api";

export const TopicsModule = {
  state: {
    topics: [],
    tagMatches: [],
    trendingTopics: [],
    currentTopic: {},
    isRequesting: false,
    isRequestingQuery: false,
    isRequestingTrending: false,
    errored: false,
    error: ''
  },
  actions: {
    fetchGenres({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit("fetchGenresRequest");
        return axios
          .get(`${API.BASE_URL}${API.GENRES}`)
          .then(response => {
            if (response.status === 200) {
              commit("fetchGenresSuccess", response.data);
              resolve(response.data.original);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            commit("topicsError", error);
            reject(error);
          });
      });
    },
    fetchTopic({
      commit
    }, topic) {
      return new Promise((resolve, reject) => {
        commit("fetchTopicRequest");
        return axios
          .get(`${API.BASE_URL}${API.TOPICS}${topic}`)
          .then(response => {
            if (response.status === 200) {
              commit("fetchTopicSuccess", response.data);
              resolve(response.data.original);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            commit("topicError", error);
            reject(error);
          });
      });
    },
    fetchTrendingTopics({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit("fetchTrendingTopicsRequest");
        return axios
          .get(`${API.BASE_URL}${API.TOPICS}${API.COLLECTIONS}?tagType=sport&sinceDaysAgo=5&limit=3`)
          .then(response => {
            if (response.status === 200) {
              commit("fetchTrendingTopicsSuccess", response.data);
              resolve(response.data.original);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            commit("trendingTopicsError", error);
            reject(error);
          });
      });
    },
    queryTopics({
      commit
    }, tagString) {
      return new Promise((resolve, reject) => {
        commit("queryTopicsRequest");
        return axios
          .get(`${API.BASE_URL}${API.TOPICS}?q=${tagString}&limit=15`)
          .then(response => {
            if (response.status === 200) {
              commit("queryTopicsSuccess", response.data);
              resolve(response.data.original);
            } else {
              reject(response);
            }
          })
          .catch(error => {
            commit("queryTopicsError", error);
            reject(error);
          });
      });
    },
    clearTopicQuery({commit}) {
      commit("clearTopicsQueryRequest");
    }
  },
  mutations: {
    fetchGenresRequest(state) {
      state.isRequesting = true;
    },
    fetchGenresSuccess(state, payload) {
      state.topics = payload;
      state.isRequesting = false;
    },
    topicsError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },
    fetchTopicRequest(state) {
      state.isRequesting = true;
    },
    fetchTopicSuccess(state, payload) {
      state.currentTopic = payload;
      state.isRequesting = false;
    },
    topicError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },
    queryTopicsRequest(state) {
      state.isRequestingQuery = true;
    },
    queryTopicsSuccess(state, payload) {
      state.tagMatches = payload;
      state.isRequestingQuery = false;
    },
    queryTopicsError(state, error) {
      state.isRequestingQuery = false;
      state.errored = true;
      state.error = error.message;
    },
    clearTopicsQueryRequest(state) {
      state.tagMatches = []
    },
    fetchTrendingTopicsRequest(state) {
      state.isRequestingTrending = true;
    },
    fetchTrendingTopicsSuccess(state, payload) {
      state.trendingTopics = payload;
      state.isRequestingTrending = false;
    },
    trendingTopicsError(state, error) {
      state.isRequestingTrending = false;
      state.errored = true;
      state.error = error.message;
    }
  },
  getters: {
    getTrendingTopicTags(state) {
      return state.trendingTopics.map(trendingTopics => trendingTopics?.primaryTopic?.tag);
    }
  }
};
