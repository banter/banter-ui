import API from '../../constants/api';
import apiRequest from '../helpers/api-request';

export default {
  state: {
    discussionsLiked: [],
    likesRequesting: false,
    isRequesting: false,
    errored: false,
    error: null,
  },
  actions: {
    fetchDiscussionsLiked({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LIKES}`,
      };
      const mutations = {
        preCommit: 'fetchDiscussionsLikedRequest',
        successCommit: 'fetchDiscussionsLikedSuccess',
        errorCommit: 'fetchDiscussionsLikedError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    likeDiscussion({
      commit,
    }, { discussionId }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LIKES}${discussionId}/${API.LIKE}`,
        method: 'POST',
      };
      const mutations = {
        preCommit: 'likeDiscussionRequest',
        successCommit: 'likeDiscussionSuccess',
        errorCommit: 'likeDiscussionError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    unlikeDiscussion({
      commit,
    }, { discussionId }) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LIKES}${discussionId}/${API.UNLIKE}`,
        method: 'POST',
      };
      const mutations = {
        preCommit: 'unlikeDiscussionRequest',
        successCommit: 'unlikeDiscussionSuccess',
        errorCommit: 'unlikeDiscussionError',
      };

      return apiRequest({ requestData, mutations, commit });
    },

  },
  mutations: {

    fetchDiscussionsLikedRequest(state) {
      state.likesRequesting = true;
    },
    fetchDiscussionsLikedSuccess(state, payload) {
      state.likesRequesting = false;
      state.followedTopics = payload.tags;
    },
    fetchDiscussionsLikedError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },

    likeDiscussionRequest(state) {
      state.likesRequesting = true;
    },
    likeDiscussionSuccess(state) {
      state.likesRequesting = false;
    },
    likeDiscussionError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },
    unlikeDiscussionRequest(state) {
      state.likesRequesting = true;
    },
    unlikeDiscussionSuccess(state) {
      state.likesRequesting = false;
    },
    unlikeDiscussionError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },

  },
};
