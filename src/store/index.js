import Vue from 'vue';
import Vuex from 'vuex';
import topics from './modules/topics';
import audio from './modules/audio';
import listen from './modules/users/listen';
import leagues from './modules/sports/leagues';
import users from './modules/users';
import actions from './modules/actions';
import sizing from './modules/sizing';
import modals from './modules/modals';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    audio,
    topics,
    users,
    sizing,
    actions,
    listen,
    modals,
    leagues,
  },
});
