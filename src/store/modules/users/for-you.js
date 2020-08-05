import API from '../../../constants/api';
import apiRequest from '../../helpers/api-request';

export default {
  state: {
    forYou: {},
    isRequestingForYou: false,
    errored: false,
    error: null,
  },
  actions: {
    fetchForYou({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}${API.FORYOU}`,
      };
      const mutations = {
        preCommit: 'fetchForYouRequest',
        successCommit: 'fetchForYouSuccess',
        errorCommit: 'fetchForYouError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
  },
  mutations: {

    fetchForYouRequest(state) {
      state.isRequestingForYou = true;
    },
    fetchForYouSuccess(state, payload) {
      state.isRequestingForYou = false;
      state.forYou = payload;
    },
    fetchForYouError(state, error) {
      state.isRequestingForYou = false;
      state.errored = true;
      state.error = error;
    },

  },
};
