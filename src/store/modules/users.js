import API from '../../constants/api';
import apiRequest from '../helpers/api-request';

export default {
  state: {
    currentUser: {},
    followedTopics: [],
    topicsRequesting: false,
    isRequesting: false,
    errored: false,
    error: null,
  },
  actions: {
    loginUser({
      commit,
    }, { authEmail, authPassword }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.LOGIN}`,
        method: 'POST',
        data: { email: authEmail, password: authPassword },
      };
      const mutations = {
        preCommit: 'fetchCurrentUserRequest',
        successCommit: 'fetchCurrentUserSuccess',
        errorCommit: 'authUserError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    signupUser({
      commit,
    }, { authName, authEmail, authPassword }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.REGISTER}`,
        method: 'POST',
        data: { name: authName, email: authEmail, password: authPassword },
      };
      const mutations = {
        preCommit: 'fetchCurrentUserRequest',
        successCommit: 'fetchCurrentUserSuccess',
        errorCommit: 'authUserError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchCurrentUser({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}`,
      };
      const mutations = {
        preCommit: 'fetchCurrentUserRequest',
        successCommit: 'fetchCurrentUserSuccess',
        errorCommit: 'currentUserError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchTopicsFollowed({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.FOLLOWING}`,
      };
      const mutations = {
        preCommit: 'fetchFollowTopicRequest',
        successCommit: 'fetchFollowTopicSuccess',
        errorCommit: 'fetchFollowTopicError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    followTopic({
      commit,
    }, { id }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.FOLLOWING}${id}/${API.FOLLOW}`,
        method: 'POST',
      };
      const mutations = {
        preCommit: 'followTopicRequest',
        successCommit: 'followTopicSuccess',
        errorCommit: 'followTopicError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    unfollowTopic({
      commit,
    }, { id }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.FOLLOWING}${id}/${API.UNFOLLOW}`,
        method: 'POST',
      };
      const mutations = {
        preCommit: 'unfollowTopicRequest',
        successCommit: 'unfollowTopicSuccess',
        errorCommit: 'unfollowTopicError',
      };

      return apiRequest({ requestData, mutations, commit });
    },
  },
  mutations: {
    fetchCurrentUserRequest(state) {
      state.isRequesting = true;
      state.error = null;
    },
    fetchCurrentUserSuccess(state, payload) {
      state.currentUser = payload;
      state.isRequesting = false;
      state.error = null;
    },
    fetchFollowTopicRequest(state) {
      state.topicsRequesting = true;
    },
    fetchFollowTopicSuccess(state, payload) {
      state.topicsRequesting = false;
      state.followedTopics = payload.tags;
    },
    fetchFollowTopicError(state, error) {
      state.topicsRequesting = false;
      state.errored = true;
      state.error = error;
    },
    currentUserError(state) {
      state.isRequesting = false;
    },
    authUserError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error;
    },
    followTopicRequest(state) {
      state.topicsRequesting = true;
    },
    followTopicSuccess(state) {
      state.topicsRequesting = false;
    },
    followTopicError(state, error) {
      state.topicsRequesting = false;
      state.errored = true;
      state.error = error;
    },
    unfollowTopicRequest(state) {
      state.topicsRequesting = true;
    },
    unfollowTopicSuccess(state) {
      state.topicsRequesting = false;
    },
    unfollowTopicError(state, error) {
      state.topicsRequesting = false;
      state.errored = true;
      state.error = error;
    },
  },
};
