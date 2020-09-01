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
    playlist: null,
    nextDiscussion: null,
    isRequesting: false,
    loadingNewAudio: false,
    fadingOut: false,
    timestampRemaining: 0,
    shareDiscussionId: null,
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
    async resetPlaylist({ commit, rootState }) {
      const { playlist } = rootState.topics.currentTopic;
      await commit('setPlaylist', playlist);
    },
    async prepareNextItem({
      commit, dispatch, state,
    }) {
      if (!state.playlist) {
        dispatch('resetPlaylist');
      }
      const startPoint = state.playlist.findIndex(
        (playlistItem) => playlistItem.discussionId === state.currentDiscussion.discussionId,
      ) || 0;
      const nextItem = state.playlist[startPoint + 1];
      if (nextItem) commit('queueNextItem', nextItem);
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

      // Natural progression (i.e. - next item)
      if (state.nextDiscussion?.discussion?.discussionId === discussion.discussionId) {
        state.audioConfig = state.nextDiscussion.howl;
      } else { // Skipped around
        dispatch('resetPlaylist');
        state.audioConfig = generateHowl(state.currentDiscussion);
      }
      dispatch('playDiscussion');
    },
    async playDiscussion({ commit, dispatch, state }) {
      if (!state.audioConfig) return;

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
    async goToNextDiscussion({ commit, state, dispatch }) {
      if (!state?.nextDiscussion?.howl) await dispatch('prepareNextItem');

      dispatch('audioListenUpdate', { markListened: true });
      await commit('killAudio');
      await commit('nextDiscussionRequest');

      dispatch('playDiscussion');
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

      return apiRequest({ requestData, commit });
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
    setPlaylist(state, playlist) {
      state.playlist = playlist;
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
      if (state?.nextDiscussion?.discussion) {
        state.currentDiscussion = state?.nextDiscussion?.discussion;
        state.audioConfig = state.nextDiscussion.howl;
      }
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
      state.audioConfig.fade(1, 0.25, state.timestampRemaining);
      state.fadingOut = true;
    },
    setShareDiscussionId(state, discussionId) {
      state.shareDiscussionId = discussionId;
    },
  },
};
