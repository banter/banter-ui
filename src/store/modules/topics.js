import axios from "axios";
import API from "../../api";

export const TopicsModule = {
  state: {
    topics: [],
    isRequesting: false,
    errored: false,
    error: ''
  },
  actions: {
    fetchTopics({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit("fetchTopicsRequest");
        return axios
          .get(`${API.BASE_URL}${API.TOPICS}`)
          .then(response => {
            if (response.status === 200) {
              commit("fetchTopicsSuccess", response.data);
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
    }
  },
  mutations: {
    fetchTopicsRequest(state) {
      state.isRequesting = true;
    },
    fetchTopicsSuccess(state, payload) {
      state.topics = payload;
      state.isRequesting = false;
    },
    topicsError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },
  },
  getters: {
    getTopics(state) {
      return state.topics;
    },
    getTopic: (state, getters) => id => {
      return getters.getTopics.find(topic => +topic.id === +id);
    }
  }
};
