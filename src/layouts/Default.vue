<template>
  <div id="banter-app">
    <BanterNavBar/>
    <BanterBottomNavBar></BanterBottomNavBar>
    <slot/>
    <AllModals/>
  </div>
</template>

<script>
import BanterNavBar from '../components/BanterNavBar.vue';
import BanterBottomNavBar from '../components/BanterBottomNavBar.vue';
import AllModals from '../components/modals/AllModals.vue';

export default {
  name: 'Banter',
  created() {
    this.$store.dispatch('fetchTrendingTopics');
    this.$store.dispatch('fetchCollections');
    this.$store.dispatch('fetchCurrentUser');
  },
  components: {
    BanterNavBar,
    BanterBottomNavBar,
    AllModals,
  },
  mounted() {
    if (this.loginError) {
      this.$bvToast.toast(this.loginError, {
        title: 'Login Error',
        variant: 'warning',
        autoHideDelay: 5000,
      });
    }
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

#banter-app{
  padding-bottom: 140px;
}
</style>
