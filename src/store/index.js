import Vue from 'vue';
import Vuex from 'vuex';
import topics from './modules/topics';
import audio from './modules/audio';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    audio,
    topics,
    users,
  },
});
