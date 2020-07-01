import API from "../../constants/api";
import {apiRequest} from "../helpers"

export const UserModule = {
  state: {
    currentUser: {},
    isRequesting: false,
    errored: false,
    error: null,
  },
  actions: {
    loginUser({
      commit
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.LOGIN}`,
        method: 'POST'
      }
      const mutations = {
        preCommit: "fetchCurrentUserRequest",
        successCommit: "fetchCurrentUserSuccess",
        errorCommit: "currentUserError"
      }
      return apiRequest({requestData, mutations, commit})
    },
    fetchCurrentUser({
      commit
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}`
      }
      const mutations = {
        preCommit: "fetchCurrentUserRequest",
        successCommit: "fetchCurrentUserSuccess",
        errorCommit: "currentUserError"
      }
      return apiRequest({requestData, mutations, commit})
    },
    clearUser({
      commit
    }) {
      commit("clearUserRequest");
    }
  },
  mutations: {
    fetchCurrentUserRequest(state) {
      state.isRequesting = true;
    },
    fetchCurrentUserSuccess(state, payload) {
      state.currentUser = payload;
      state.isRequesting = false;
    },
    currentUserError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },
    clearUserRequest(state) {
      state.currentUser = {};
    }
  }
};
