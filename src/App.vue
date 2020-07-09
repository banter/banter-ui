<template>
  <div id="app">
    <BanterNavBar/>
    <AudioPlayer v-if="audioConfig"/>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

import BanterNavBar from "./components/BanterNavBar"
import AudioPlayer from "./components/AudioPlayer"
import { mapState } from 'vuex'

export default {
  name: 'Banter',
  created() {
    this.$store.dispatch("fetchGenres");
    this.$store.dispatch("fetchTrendingTopics");
    this.$store.dispatch("fetchCollections");
    this.$store.dispatch("fetchCurrentUser");
  },
  components: {
    BanterNavBar,
    AudioPlayer
  },
  computed: {
    ...mapState({
      audioConfig: state => state.audio.audioConfig
    }),
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
