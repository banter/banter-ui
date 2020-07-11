export default {
  state: {
    heroSize: 300,
    isMobile: null,
  },
  actions: {
    resizeWindow({
      commit,
    }) {
      commit('updateSiteSizing');
    },
  },
  mutations: {
    updateSiteSizing(state) {
      const screenWidth = window.innerWidth;
      if (screenWidth < 420) {
        state.heroSize = 180;
        state.isMobile = true;
      } else if (screenWidth < 600) {
        state.heroSize = 270;
        state.isMobile = false;
      } else if (screenWidth < 750) {
        state.heroSize = 300;
        state.isMobile = false;
      } else if (screenWidth < 1200) {
        state.heroSize = 350;
        state.isMobile = false;
      } else {
        state.heroSize = 500;
        state.isMobile = false;
      }
    },
  },
};
