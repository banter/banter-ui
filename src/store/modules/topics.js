import Vue from 'vue';
import API from '../../constants/api';
import apiRequest from '../helpers';

export default {
  state: {
    topics: [],
    collections: [],
    tagMatches: [],
    trendingTopics: [],
    currentTopic: {},
    isRequesting: false,
    isRequestingQuery: false,
    isRequestingTrending: false,
    errored: false,
    error: '',
  },
  actions: {
    fetchGenres({
      commit,
    }) {
      const requestData = { url: `${API.BASE_URL}${API.GENRES}` };
      const mutations = {
        preCommit: 'fetchGenresRequest',
        successCommit: 'fetchGenresSuccess',
        errorCommit: 'topicsError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchTopic({ commit }, topic) {
      const requestData = { url: `${API.BASE_URL}${API.TOPICS}${topic}` };
      const mutations = {
        preCommit: 'fetchTopicRequest',
        successCommit: 'fetchTopicSuccess',
        errorCommit: 'topicError',
      };
      return apiRequest({ requestData, mutations, commit });
    },
    fetchTrendingTopics({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}${API.TRENDING}`,
        queries: {
          sinceDaysAgo: 5,
          limit: 3,
        },
      };
      const mutations = {
        preCommit: 'fetchTrendingTopicsRequest',
        successCommit: 'fetchTrendingTopicsSuccess',
        errorCommit: 'trendingTopicsError',
      };

      return apiRequest({ requestData, mutations, commit });
    },
    fetchCollections({
      commit,
    }) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}${API.COLLECTIONS}`,
        queries: {
          tagType: 'sport',
          sinceDaysAgo: 5,
          limit: 10,
        },
      };
      const mutations = {
        preCommit: 'fetchCollectionsRequest',
        successCommit: 'fetchCollectionsSuccess',
        errorCommit: 'collectionsError',
      };

      return apiRequest({ requestData, mutations, commit });
    },
    queryTopics({
      commit,
    }, tagString) {
      const requestData = {
        url: `${API.BASE_URL}${API.TOPICS}`,
        queries: {
          q: tagString,
          limit: 15,
        },
      };
      const mutations = {
        preCommit: 'queryTopicsRequest',
        successCommit: 'queryTopicsSuccess',
        errorCommit: 'queryTopicsError',
      };

      return apiRequest({ requestData, mutations, commit });
    },
    clearTopicQuery({ commit }) {
      commit('clearTopicsQueryRequest');
    },
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
      state.tagMatches = [];
    },
    fetchTrendingTopicsRequest(state) {
      state.isRequestingTrending = true;
    },
    fetchTrendingTopicsSuccess(state, payload) {
      Vue.set(state, 'trendingTopics', payload);
      state.isRequestingTrending = false;
    },
    trendingTopicsError(state, error) {
      state.isRequestingTrending = false;
      state.errored = true;
      state.error = error.message;
    },
    fetchCollectionsRequest(state) {
      state.isRequestingCollections = true;
    },
    fetchCollectionsSuccess(state, payload) {
      state.collections = payload;
      state.isRequestingCollections = false;
    },
    collectionsError(state, error) {
      state.isRequestingCollections = false;
      state.errored = true;
      state.error = error.message;
    },
  },
  getters: {
    getTrendingTopicTags(state) {
      return state.trendingTopics.map((trendingTopics) => trendingTopics?.tag);
    },
  },
};
