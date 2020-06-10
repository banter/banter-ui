<template>
  <div id="app">
    <BanterNavbar/>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import BanterNavbar from "./components/BanterNavBar"
export default {
  name: 'App',
  created() {
    this.$store.dispatch("fetchGenres");
  },
  components: {
    BanterNavbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
