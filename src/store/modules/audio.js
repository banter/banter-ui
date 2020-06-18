import { Howl } from 'howler';

export const AudioModule = {
  state: {
    currentAudio: null,
    currentDiscussion: null,
    audioConfig: null,
    isRequesting: false,
    timestampRemaining: 0
  },
  actions: {
    playAudio({ commit, dispatch }, discussion) {
      if (discussion) { //if we pass a specific discussion, play it
        commit('killAudioRequest')
        dispatch('createAudio', discussion)
      } else { 
        dispatch('resumeAudio', discussion) // play paused audio
      } // TODO - if neither, start from top of playlist
    },
    pauseAudio({ commit }) {
      commit("pauseAudioRequest");
    },
    resumeAudio({ commit }) {
      commit("resumeAudioRequest");
    },
    createAudio({ commit, rootState, state, dispatch }, discussion) {
      commit('killAudioRequest')
      commit("createAudioRequest", discussion);
      state.currentDiscussion = discussion
      
      const { episodePlaybackUrl, startTimeMillis, endTimeMillis } = state.currentDiscussion

      const audioInfo = new Audio(episodePlaybackUrl)
      audioInfo.onloadedmetadata = () => {
        state.currentDiscussion.endTimeMillis = endTimeMillis || (audioInfo.duration * 1000)

        state.audioConfig = new Howl({
          html5: true,
          src: episodePlaybackUrl,
          sprite: {
            // fix this for END
            clip: [startTimeMillis, (state.currentDiscussion.endTimeMillis - startTimeMillis)]
          }
        });
        
        state.currentAudio = state.audioConfig.play('clip');
        commit('audioRequestSuccess')
        
        // only use sprite if there's an endtime provided
        state.audioConfig.on('end', () => {
          const {playlist} = rootState.topics.currentTopic
  
          const nextItemIndex = playlist.findIndex(playlistItem => playlistItem.discussionId === state.currentDiscussion.discussionId) + 1
          const nextDiscussion = playlist[nextItemIndex]
  
          nextDiscussion ? dispatch('createAudio', nextDiscussion) : dispatch('killAudio')
        });
      }
    },
    goToEndOfDiscussion({ commit }) {
      commit('endOfDiscussionRequest')
    },
    goTostartOfDiscussion({ commit }) {
      commit('startOfDiscussionRequest')
    },
    goBack15Seconds({ commit }) {
      commit('back15SecondsRequest')
    },
    goForward15Seconds({ commit }) {
      commit('forward15SecondsRequest')
    },
    goToNextDiscussion({ commit }) {
      commit('nextDiscussionRequest')
    },
    killAudio({ commit }) {
      commit('killAudioRequest')
    },
    getRemainingTime({ commit }) {
      commit('updateTimestamp')
    }
  },
  mutations: {
    createAudioRequest(state) {
      state.isRequesting = true
    },
    audioRequestSuccess(state) {
      state.isRequesting = false
    },
    pauseAudioRequest(state) {
      state.audioConfig.pause(state.currentAudio)
    },
    resumeAudioRequest(state) {
      state.audioConfig.play(state.currentAudio)
    },
    back15SecondsRequest(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) - 15;
      state.audioConfig.seek(Math.max(newTimestamp, 0), state.currentAudio)
    },
    forward15SecondsRequest(state) {
      const newTimestamp = (+state.audioConfig.seek() || 0) + 15;
      state.audioConfig.seek(Math.min(newTimestamp, state.currentDiscussion.endTimeMillis), state.currentAudio)
    },
    startOfDiscussionRequest(state) {
      state.audioConfig.seek(0, state.currentAudio)
    },
    nextDiscussionRequest(state) {
      state.audioConfig.seek(state.currentDiscussion.endTimeMillis, state.currentAudio)
    },
    endOfDiscussionRequest(state) {
      const fiveSecondsLeft = state.currentDiscussion.endTimeMillis / 1000 - 5
      state.audioConfig.seek(fiveSecondsLeft, state.currentAudio)
    },
    killAudioRequest(state) {
      if (state.audioConfig) {
        state.audioConfig.unload(this.currentAudio)
        state.currentAudio = null
        state.audioConfig = {}
      }
    },
    updateTimestamp(state) {
      const { endTimeMillis } = state.currentDiscussion
      let currentTime
      try {
        currentTime = (+state?.audioConfig?.seek() || 0) * 1000
      } catch (e) {
        currentTime = 0
      }
      const remainingMillis = (endTimeMillis && currentTime) ? endTimeMillis - currentTime : 0
      state.timestampRemaining = remainingMillis
    }
  }
}
