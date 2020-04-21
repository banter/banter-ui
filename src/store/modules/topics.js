// import axios from "axios";
// import API from "../../api";

export const TopicsModule = {
  state: {
    topics: [{name: 'NFL Draft', id: 1, playlist: [
      {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: 3000, endTime: 4000},
      {title: 'I miss sports?', audioUrl: 'http://feeds.soundcloud.com/stream/795187915-scottiedeubler43-episode-127-dustin-paul-bryan-smith.mp3', startTime: 10000, endTime: 15000}
    ]}, {name: 'MLB Players', id: 2, playlist: [
      {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: 2000, endTime: 5000},
      {title: 'I miss sports?', audioUrl: 'http://feeds.soundcloud.com/stream/795187915-scottiedeubler43-episode-127-dustin-paul-bryan-smith.mp3', startTime: '2:34', endTime: '3:45'}
    ]}, {name: 'NBA Playoffs', id: 3, playlist: [
      {title: "We're back in the wasteland of Quarantine. XFL is gone and MLB has some weird way of coming back to life", audioUrl: 'https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3', startTime: 4000, endTime: 8000},
      {title: 'I miss sports?', audioUrl: 'http://feeds.soundcloud.com/stream/795187915-scottiedeubler43-episode-127-dustin-paul-bryan-smith.mp3', startTime: '2:34', endTime: '3:45'}
    ]}],
    isRequesting: false,
    errored: false,
    error: ''
  },
  actions: {
    fetchTopics({
      commit
    }) {
      return new Promise(() => {
        commit("fetchTopicsRequest");
        // return axios
        //   .get(`${API.BASE_URL}${API.TOPICS}`)
        //   .then(response => {
        //     if (response.status === 200) {
        //       commit("fetchTopicsSuccess", response.data);
        //       resolve(response.data.original);
        //     } else {
        //       reject(response);
        //     }
        //   })
        //   .catch(error => {
        //     commit("topicsError", error);
        //     reject(error);
        //   });
      });
    }
  },
  mutations: {
    fetchTopicsRequest(state) {
      state.isRequesting = true;
    },
    fetchTopicsSuccess(state) {
      // state.topics = payload;
      state.isRequesting = false;
    },
    topicsError(state, error) {
      state.isRequesting = false;
      state.errored = true;
      state.error = error.message;
    },
  },
  getters: {
    getTopics(state) {
      return state.topics;
    },
    getTopic: (state, getters) => id => {
      return getters.getTopics.find(topic => +topic.id === +id);
    }
  }
};
