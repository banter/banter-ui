<template>
  <div class="fixed-bottom">
    <AudioPlayer v-if="audioConfig || loadingNewAudio" />
    <BanterMobileNavBar v-if="isMobile" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BanterMobileNavBar from './BanterMobileNavBar.vue';
import AudioPlayer from './AudioPlayer.vue';

export default {
  name: 'BanterBottomNavBar',
  components: {
    BanterMobileNavBar,
    AudioPlayer,
  },
  computed: {
    ...mapState({
      audioConfig: (state) => state.audio.audioConfig,
      loadingNewAudio: (state) => state.audio.loadingNewAudio,
      isMobile: (state) => state.sizing.isMobile,
    }),
  },
};
</script>

<style scoped lang="scss">
.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}
</style>
