import API from '../../constants/api';
import AUTH from '../../constants/auth';
import router from '../../router';

import apiRequest from '../helpers/api-request';

export default {
  state: {
    currentUser: {},
    followedTopics: [],
    topicsRequesting: false,
    followRequesting: false,
    isRequesting: false,
    errored: false,
    error: null,
    toggledFollowTopic: null,
  },
  actions: {
    loginUser({ dispatch }, { authEmail, authPassword }) {
      return dispatch('coreAuth', {
        authEmail, authPassword, isNewUser: false,
      });
    },
    signupUser({ dispatch }, { authName, authEmail, authPassword }) {
      return dispatch('coreAuth', {
        authName, authEmail, authPassword, isNewUser: true,
      });
    },
    coreAuth({
      commit, dispatch,
    }, {
      authName, authEmail, authPassword, isNewUser,
    }) {
      const endpoint = isNewUser ? API.REGISTER : API.LOGIN;
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${endpoint}`,
        method: 'POST',
        data: { name: authName, email: authEmail, password: authPassword },
      };
      const mutations = {
        preCommit: 'fetchCurrentUserRequest',
        successCommit: 'authUserSuccess',
        errorCommit: 'authUserError',
      };
      const actions = {
        successDispatch: 'fetchCurrentUser',
        errorDispatch: 'loginAnonUser',
      };
      return apiRequest({
        requestData, mutations, actions, commit, dispatch,
      });
    },
    loginAnonUser({
      commit, state,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.LOGIN_ANON}`,
        method: 'POST',
        data: state.anonId ? {} : { id: state.anonId },
      };
      const mutations = {
        preCommit: 'anonLoginRequest',
        successCommit: 'anonLoginSuccess',
        errorCommit: 'anonLoginError',
      };

      return apiRequest({
        requestData, mutations, commit,
      });
    },
    fetchCurrentUser({
      commit, dispatch,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}`,
      };
      const mutations = {
        preCommit: 'fetchCurrentUserRequest',
        successCommit: 'fetchCurrentUserSuccess',
        errorCommit: 'currentUserError',
      };
      const actions = {
        successDispatch: 'fetchUserPastActions',
        errorDispatch: 'loginAnonUser',
      };
      return apiRequest({
        requestData, mutations, commit, dispatch, actions,
      });
    },
    fetchUserPastActions({ dispatch, state }) {
      if (state?.currentUser && !state?.currentUser?.anonymous) {
        dispatch('fetchTopicsFollowed');
        dispatch('fetchDiscussionsLiked');
        dispatch('fetchForYou');
        dispatch('fetchFollowing');
      }
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
    async followTopic({
      commit, dispatch,
    }, topic) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.FOLLOWING}${topic.id}/${API.FOLLOW}`,
        method: 'POST',
      };
      const mutations = {
        errorCommit: 'followTopicError',
      };
      commit('followTopicRequest', topic);
      await apiRequest({
        requestData, mutations, dispatch, commit,
      });
      commit('followTopicSuccess', topic);
      dispatch('fetchForYouSilently');
      dispatch('fetchFollowingSilently');
    },
    async unfollowTopic({
      commit, dispatch,
    }, topic) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.FOLLOWING}${topic.id}/${API.UNFOLLOW}`,
        method: 'POST',
      };
      const mutations = {
        preCommit: 'unfollowTopicRequest',
        errorCommit: 'unfollowTopicError',
      };
      commit('unfollowTopicRequest', topic);
      await apiRequest({
        requestData, mutations, dispatch, commit,
      });
      commit('unfollowTopicSuccess', topic);
      dispatch('fetchForYouSilently');
      dispatch('fetchFollowingSilently');
    },
  },
  mutations: {
    fetchCurrentUserRequest(state) {
      const { token } = router.currentRoute?.query;
      if (token) window.localStorage.setItem(AUTH.BANTER_ACCESS_TOKEN, token);

      state.isRequesting = true;
      state.error = null;
    },
    authUserSuccess(state, { accessToken }) {
      if (accessToken) window.localStorage.setItem(AUTH.BANTER_ACCESS_TOKEN, accessToken);
      state.isRequesting = false;
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
      state.anonId = window.localStorage.getItem('banter-temporary-login-id');
    },
    followTopicRequest(state, topic) {
      state.toggledFollowTopic = topic;
      state.followRequesting = true;
    },
    followTopicSuccess(state, topic) {
      state.toggledFollowTopic = null;
      state.followRequesting = false;
      state.followedTopics.push(topic);
    },
    followTopicError(state, error) {
      state.toggledFollowTopic = null;
      state.followRequesting = false;
      state.errored = true;
      state.error = error;
    },
    unfollowTopicRequest(state, topic) {
      state.toggledFollowTopic = topic;
      state.followRequesting = true;
    },
    unfollowTopicSuccess(state, outTopic) {
      state.toggledFollowTopic = null;
      state.followedTopics = state.followedTopics
        .filter((inTopic) => inTopic.id !== outTopic.id);
      state.followRequesting = false;
    },
    unfollowTopicError(state, error) {
      state.toggledFollowTopic = null;
      state.followRequesting = false;
      state.errored = true;
      state.error = error;
    },
    anonLoginRequest(state) {
      state.isRequesting = true;
    },
    anonLoginSuccess(state, payload) {
      window.localStorage.setItem('banter-temporary-login-id', payload.data.id);
      state.isRequesting = false;
    },
    anonLoginError(state) {
      state.isRequesting = false;
    },
  },
};
