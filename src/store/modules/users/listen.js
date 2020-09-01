import API from '../../../constants/api';
import apiRequest from '../../helpers/api-request';

export default {
  state: {
    forYou: { playlist: [] },
    following: { playlist: [] },
    discussion: { playlist: [] },
    isRequestingListen: false,
    isRequesting: false,
    errored: false,
    error: null,
  },
  actions: {
    fetchForYouSilently({ dispatch }) {
      dispatch('fetchForYou', true);
    },
    fetchForYou({
      commit,
    }, isSilent) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}${API.FORYOU}`,
        queries: {
          limit: 15,
        },
      };
      const mutations = {
        preCommit: !isSilent && 'fetchListenRequest',
        successCommit: 'fetchForYouSuccess',
        errorCommit: 'fetchListenError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchFollowingSilently({ dispatch }) {
      dispatch('fetchFollowing', true);
    },
    fetchFollowing({
      commit,
    }, isSilent) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}${API.FOLLOWING}`,
        queries: {
          limit: 15,
        },
      };
      const mutations = {
        preCommit: !isSilent && 'fetchListenRequest',
        successCommit: 'fetchFollowingSuccess',
        errorCommit: 'fetchListenError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchDiscussionById({ commit }, id) {
      const requestData = {
        url: `${API.BASE_URL}${API.DISCUSSIONS}${id}`,
      };
      const mutations = {
        preCommit: 'fetchDiscussionRequest',
        successCommit: 'fetchDiscussionSuccess',
        errorCommit: 'discussionError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
  },
  mutations: {
    fetchListenRequest(state) {
      state.isRequestingListen = true;
    },
    fetchForYouSuccess(state, payload) {
      state.isRequestingListen = false;
      state.forYou = payload;
    },
    fetchFollowingSuccess(state, payload) {
      state.isRequestingListen = false;
      state.following = payload;
    },
    fetchListenError(state, error) {
      state.isRequestingListen = false;
      state.errored = true;
      state.error = error;
    },
    fetchDiscussionRequest(state) {
      state.isRequesting = true;
    },
    fetchDiscussionSuccess(state, payload) {
      state.discussion.playlist = [payload];
      state.isRequesting = false;
    },
    discussionError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },

  },
};
