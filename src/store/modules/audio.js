import moment from 'moment';
import generateHowl from '../helpers/howl-generator';
import API from '../../constants/api';
import apiRequest from '../helpers/api-request';

function isCurrentDiscussionCompleted(state) {
  return state.timestampRemaining < 10000 && state.timestampRemaining !== 0;
}

function getAudioProgress(state) {
  const durationMillis = moment.utc(moment.duration(state.currentDiscussion.duration).as('milliseconds'));
  return state.timestampRemaining === 0
    ? 0 : durationMillis - state.timestampRemaining;
}

export default {
  state: {
    currentAudio: null,
    currentDiscussion: null,
    audioConfig: null,
    nextDiscussion: null,
    isRequesting: false,
    loadingNewAudio: false,
    fadingOut: false,
    timestampRemaining: 0,
    audioRate: 1,
    audioIcon: 'play',
  },
  actions: {
    playAudio({ commit, dispatch }, discussion) {
      if (discussion) { // if we pass a specific discussion, play it
        commit('killAudio');
        dispatch('createAudio', discussion);
      } else {
        dispatch('resumeAudio', discussion); // play paused audio
      } // TODO - if neither, start from top of playlist
    },
    pauseAudio({ commit, dispatch }) {
      commit('pauseAudioRequest');
      dispatch('audioListenUpdate', {});
    },
    resumeAudio({ commit }) {
      commit('resumeAudioRequest');
    },
    prepareNextItem({
      commit, rootState, state,
    }) {
      const { playlist } = rootState.topics.currentTopic;
      const startPoint = playlist.findIndex(
        (playlistItem) => playlistItem.discussionId === state.currentDiscussion.discussionId,
      ) || 0;
      commit('queueNextItem', playlist[startPoint + 1]);
    },
    async createAudio({
      commit, state, dispatch,
    }, discussion) {
      // If CreateAudio is Played we are marking as listened
      if (state?.currentDiscussion?.discussionId) {
        // If there is an existing Discussion, send update before its killed
        dispatch('audioListenUpdate', { markListened: true });
      }
      commit('killAudio', true);
      commit('createAudioRequest');

      state.currentDiscussion = discussion;
      // Send new update after it has been started
      dispatch('audioListenUpdate', { markListened: false, progressMillis: 0 });

      if (state.nextDiscussion?.discussion?.discussionId === discussion.discussionId) {
        state.audioConfig = state.nextDiscussion.howl;
      } else {
        state.audioConfig = generateHowl(state.currentDiscussion);
      }
      state.currentAudio = await state.audioConfig.play('clip');
      state.audioConfig.rate(state.audioRate);

      commit('audioRequestSuccess');

      dispatch('prepareNextItem');
      dispatch('setupAutoplay');
    },
    setupAutoplay({ dispatch, state }) {
      state.audioConfig.on(
        'end', () => (state.nextDiscussion ? dispatch('createAudio', state.nextDiscussion.discussion) : dispatch('killAudio')),
      );
    },
    goForward15Seconds({ commit }) {
      commit('forward15SecondsRequest');
    },
    goBack15Seconds({ commit }) {
      commit('back15SecondsRequest');
    },
    goToNextDiscussion({ commit }) {
      // current configruation goes to "end" and then creates
      // New Audio. Therefore the switch to a new discussion handles audioListenUpdate
      commit('nextDiscussionRequest');
    },

    audioListenUpdate({
      commit, state,
    }, { markListened, progressMillis }) {
      const listened = markListened === undefined
        ? isCurrentDiscussionCompleted(state) : markListened;
      const progress = progressMillis === undefined
        ? getAudioProgress(state) : progressMillis;
      const requestData = {
        url: `${API.BASE_URL}${API.USERS}${API.ME}${API.LISTENS}${state.currentDiscussion.discussionId}/${API.UPDATE}`,
        method: 'POST',
        data: {
          progressMillis: progress,
          markListened: listened,
        },
      };
      const mutations = {
        preCommit: 'audioListenUpdateRequest',
        successCommit: 'audioListenUpdateSuccess',
        errorCommit: 'audioListenUpdateError',
      };

      return apiRequest({ requestData, mutations, commit });
    },
    getRemainingTimeRequest({ commit, state }) {
      commit('getRemainingTime');
      if (state.timestampRemaining <= 5000 && state.timestampRemaining > 0 && !state.fadingOut) {
        commit('fadeOut');
      }
    },
  },
  // Edits the data
  mutations: {

    audioListenUpdateRequest() {
    },
    audioListenUpdateSuccess() {
    },
    audioListenUpdateError() {
    },

    queueNextItem(state, nextItem) {
      state.nextDiscussion = {
        howl: generateHowl(nextItem),
        discussion: nextItem,
      };
    },
    createAudioRequest(state) {
      state.isRequesting = true;
      state.audioIcon = 'loading';
      state.fadingOut = false;
    },
    audioRequestSuccess(state) {
      state.isRequesting = false;
      state.audioIcon = 'pause';
      state.loadingNewAudio = false;
    },
    pauseAudioRequest(state) {
      state.audioConfig.pause(state.currentAudio);
      state.audioIcon = 'play';
    },
    resumeAudioRequest(state) {
      state.audioConfig.play(state.currentAudio);
      state.audioIcon = 'pause';
    },
    back15SecondsRequest(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) - 15;
      state.audioConfig.seek(Math.max(newTimestamp, 0), state.currentAudio);
    },
    forward15SecondsRequest(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) + 15;
      const seekSpot = Math.min(newTimestamp, state.currentDiscussion.endTimeMillis);
      state.audioConfig.seek(seekSpot, state.currentAudio);
    },
    goTostartOfDiscussion(state) {
      state.audioConfig.seek(0, state.currentAudio);
    },
    nextDiscussionRequest(state) {
      state.audioConfig.seek(state.currentDiscussion.endTimeMillis, state.currentAudio);
    },
    adjustRate(state, newRate) {
      state.audioRate = newRate;
      state.audioConfig.rate(state.audioRate);
    },
    goToEndOfDiscussion(state) {
      const fiveSecondsLeft = state.currentDiscussion.endTimeMillis / 1000 - 5;
      state.audioConfig.seek(fiveSecondsLeft, state.currentAudio);
    },
    killAudio(state, newAudioLoading) {
      if (state.audioConfig) {
        if (state.currentAudio) state.audioConfig.unload(state.currentAudio);
        state.loadingNewAudio = !!newAudioLoading;
        state.currentAudio = null;
        state.audioConfig = null;
        state.audioIcon = 'play';
      }
    },
    getRemainingTime(state) {
      const { endTimeMillis } = state.currentDiscussion;
      let currentTime;
      try {
        currentTime = (+state?.audioConfig?.seek() || 0) * 1000;
      } catch (e) {
        currentTime = 0;
      }
      const remainingMillis = (endTimeMillis && currentTime) ? endTimeMillis - currentTime : 0;
      state.timestampRemaining = remainingMillis;
    },
    fadeOut(state) {
      state.audioConfig.fade(1, 0, state.timestampRemaining);
      state.fadingOut = true;
    },
  },
};
