<template>
  <div id="banter-app">
    <BanterNavBar/>
    <BanterBottomNavBar></BanterBottomNavBar>
    <slot/>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import BanterNavBar from '../components/BanterNavBar.vue';
import BanterBottomNavBar from '../components/BanterBottomNavBar.vue';

export default {
  name: 'Banter',
  created() {
    this.$store.dispatch('fetchTrendingTopics');
    this.$store.dispatch('fetchCollections');
    this.$store.dispatch('fetchCurrentUser');
    this.$store.dispatch('fetchTopicsFollowed');
    this.$store.dispatch('fetchDiscussionsLiked');
  },
  components: {
    BanterNavBar,
    BanterBottomNavBar,
  },
  mounted() {
    if (this.loginError) {
      this.$bvToast.toast(this.loginError, {
        title: 'Login Error',
        variant: 'warning',
        autoHideDelay: 5000,
      });
    }
    window.addEventListener('resize', this.resizeWindow);
    this.resizeWindow();
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeWindow);
  },
  methods: {
    ...mapActions(['resizeWindow']),
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
