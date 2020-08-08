<template>
  <div>
    <div v-if="!isMobile"  class="desktop-nav">
      <b-navbar toggleable="lg" type="light" variant="faded">
        <b-navbar-brand>
          <router-link :to="'/home'">
            <b-img height="60" :src="require('../assets/Banter_logo_dark.png')" alt="Banter Logo">
            </b-img>
          </router-link>
        </b-navbar-brand>
        <LinkButton v-bind:isMobile="false"></LinkButton>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav mr-auto">
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <AuthModalButton></AuthModalButton>
          </div>
          <SearchBar></SearchBar>
        </b-collapse>
      </b-navbar>
    </div>
    <b-navbar v-else toggleable="lg" type="light" variant="faded">
      <b-navbar-brand margin="auto">
        <router-link :to="'/home'">
          <b-img height="60" :src="require('../assets/Banter_logo_dark.png')" alt="Banter Logo">
          </b-img>
        </router-link>
      </b-navbar-brand>
      <div class="form-inline my-2 my-lg-0">
        <AuthModalButton></AuthModalButton>
      </div>
    </b-navbar>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import AuthModalButton from './AuthModalButton.vue';
import SearchBar from './commons/SearchBar.vue';
import LinkButton from './commons/LinkButton.vue';

export default {
  name: 'BanterNavBar',
  components: {
    AuthModalButton,
    SearchBar,
    LinkButton,
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.sizing.isMobile,
    }),
  },
};
</script>
<style>
.desktop-nav {
    z-index: 2;
    background: white;
    position: relative;
}
</style>
