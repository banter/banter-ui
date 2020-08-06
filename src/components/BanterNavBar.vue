<template>
  <div>
    <!-- <nav class="navbar navbar-default">
      BBB
      </nav>
<nav class="navbar navbar-default navbar-fixed-top">
    AAAAA
</nav> -->
    <b-navbar v-if="!isMobile" toggleable="lg" type="light" variant="faded">
      <b-navbar-brand>
        <router-link :to="'/home'">
          <b-img height="60" :src="require('../assets/Banter_logo_dark.png')" alt="Banter Logo">
          </b-img>
        </router-link>
      </b-navbar-brand>
      <ForYouButton v-bind:isMobile="false"></ForYouButton>
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
import ForYouButton from './commons/ForYouButton.vue';

export default {
  name: 'BanterNavBar',
  components: {
    AuthModalButton,
    SearchBar,
    ForYouButton,
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.sizing.isMobile,
    }),
  },
};
</script>
