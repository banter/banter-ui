import generateHowl from '../helpers/howl-generator';

export default {
  state: {
    currentAudio: null,
    currentDiscussion: null,
    audioConfig: null,
    nextDiscussion: null,
    isRequesting: false,
    loadingNewAudio: false,
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
    pauseAudio({ commit }) {
      commit('pauseAudioRequest');
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
      commit('killAudio', true);
      commit('createAudioRequest');

      state.currentDiscussion = discussion;

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
  },
  // Edits the data
  mutations: {
    queueNextItem(state, nextItem) {
      state.nextDiscussion = {
        howl: generateHowl(nextItem),
        discussion: nextItem,
      };
    },
    createAudioRequest(state) {
      state.isRequesting = true;
      state.audioIcon = 'loading';
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
    goBack15Seconds(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) - 15;
      state.audioConfig.seek(Math.max(newTimestamp, 0), state.currentAudio);
    },
    goForward15Seconds(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) + 15;
      const seekSpot = Math.min(newTimestamp, state.currentDiscussion.endTimeMillis);
      state.audioConfig.seek(seekSpot, state.currentAudio);
    },
    goTostartOfDiscussion(state) {
      state.audioConfig.seek(0, state.currentAudio);
    },
    goToNextDiscussion(state) {
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
  },
};
