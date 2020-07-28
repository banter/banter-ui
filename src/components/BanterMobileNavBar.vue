<template>
  <div class="mobile-nav-bar">
    <nav class="navbar navbar-light navbar-expand-md justify-content-center">
      <b-navbar-brand class="navbar-brand d-flex m-auto">
        <router-link :to="'/home'" class="navbar-brand d-flex m-auto">
          <b-icon icon="house" font-scale="1.2" style="margin:auto">
          </b-icon>
          <a>Home</a>
        </router-link>
      </b-navbar-brand>
      <b-navbar-brand class="navbar-brand d-flex m-auto">
        <MyFeedButton></MyFeedButton>
      </b-navbar-brand>
      <b-navbar-nav class="navbar-brand d-flex m-auto ">
        <router-link :to="'/explore'" class="navbar-brand d-flex m-auto">
          <b-icon icon="search" font-scale="1.2" style="margin:auto"> </b-icon>
          Search
        </router-link>
      </b-navbar-nav>

    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MyFeedButton from './commons/MyFeedButton.vue';

export default {
  name: 'BanterMobileNavBar',
  components: {
    MyFeedButton,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
};
</script>

<style scoped lang="scss">

.navbar {
    padding:none;
}

.navbar-brand{
    flex-direction:column
}

.fixed-bottom {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}

.mobile-nav-bar {
  margin: auto;
  background: lightgray;
}

.mobile-nav-bar-container {
  padding: 0;
  display: flex;
}

.mobile-nav-bar-container div {
  margin: auto;
}
</style>
