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
    async likeDiscussion({
      commit,
    }, discussion) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LIKES}${discussion.discussionId}/${API.LIKE}`,
        method: 'POST',
      };
      const mutations = {
        errorCommit: 'likeDiscussionError',
      };

      commit('likeDiscussionRequest', discussion);
      await apiRequest({ requestData, mutations, commit });
      commit('likeDiscussionSuccess', discussion);
    },
    async unlikeDiscussion({
      commit,
    }, discussion) {
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LIKES}${discussion.discussionId}/${API.UNLIKE}`,
        method: 'POST',
      };
      const mutations = {
        errorCommit: 'unlikeDiscussionError',
      };

      commit('unlikeDiscussionRequest', discussion);
      await apiRequest({ requestData, mutations, commit });
      commit('unlikeDiscussionSuccess', discussion);
    },

  },
  mutations: {
    fetchDiscussionsLikedRequest(state) {
      state.likesRequesting = true;
    },
    fetchDiscussionsLikedSuccess(state, payload) {
      state.likesRequesting = false;
      state.discussionsLiked = payload.discussions;
    },
    fetchDiscussionsLikedError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },

    likeDiscussionRequest(state, discussion) {
      state.likesRequesting = true;
      const currentDiscussion = this.state?.topics?.currentTopic?.playlist
        ?.find((playDiscussion) => discussion.discussionId === playDiscussion.discussionId);
      currentDiscussion.likedCount += 1;
    },
    likeDiscussionSuccess(state, discussion) {
      state.likesRequesting = false;
      state.discussionsLiked.push(discussion);
    },
    likeDiscussionError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },
    unlikeDiscussionRequest(state, outDiscussion) {
      state.likesRequesting = true;
      const currentDiscussion = this.state?.topics?.currentTopic?.playlist
        ?.find((playDiscussion) => outDiscussion.discussionId === playDiscussion.discussionId);
      currentDiscussion.likedCount -= 1;
    },
    unlikeDiscussionSuccess(state, outDiscussion) {
      state.discussionsLiked = state.discussionsLiked
        .filter((inDiscussion) => inDiscussion.discussionId !== outDiscussion.discussionId);
      state.likesRequesting = false;
    },
    unlikeDiscussionError(state, error) {
      state.likesRequesting = false;
      state.errored = true;
      state.error = error;
    },

  },
};
