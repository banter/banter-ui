<template>
  <div class="mobile-nav-bar">
    <nav class="navbar navbar-light navbar-expand-md justify-content-center mobile-nav-bar-content">
      <b-navbar-brand class="navbar-brand d-flex m-auto">
        <router-link :to="'/home'" class="navbar-brand d-flex m-auto">
          <b-icon icon="house" font-scale="1.2" style="margin:auto">
          </b-icon>
          <a>Home</a>
        </router-link>
      </b-navbar-brand>
      <b-navbar-brand class="navbar-brand d-flex m-auto">
        <LinkButton v-bind:isMobile="true"></LinkButton>
      </b-navbar-brand>
      <b-navbar-nav class="navbar-brand d-flex m-auto ">
        <router-link :to="'/explore'" class="navbar-brand d-flex m-auto">
          <b-icon icon="search" font-scale="1.2" style="margin:auto"> </b-icon>
          Explore
        </router-link>
      </b-navbar-nav>

    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LinkButton from './commons/LinkButton.vue';

export default {
  name: 'BanterMobileNavBar',
  components: {
    LinkButton,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
};
</script>

<style scoped lang="scss">

.navbar-brand{
    flex-direction:column
}

.mobile-nav-bar {
  margin: auto;
  background: lightgray;
}

.mobile-nav-bar-content {
  padding: 0;
  line-height: 1;
}
</style>
