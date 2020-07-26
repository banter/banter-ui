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
        <router-link :to="'/home'" class="navbar-brand d-flex m-auto">
          <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
          My Banters
        </router-link>
      </b-navbar-brand>
      <b-navbar-nav class="navbar-brand d-flex m-auto ">
        <router-link :to="'/home'" class="navbar-brand d-flex m-auto">
          <b-icon icon="search" font-scale="1.2" style="margin:auto"> </b-icon>
          Search
        </router-link>
      </b-navbar-nav>

    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BanterMobileNavBar',
  components: {
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

.audio-icon {
  margin: auto;
}

.mobile-nav-bar-container {
  padding: 0;
  display: flex;
}

.audio-description {
  display: flex;
}

.mobile-nav-bar-container div {
  margin: auto;
}

.audio-icon {
  cursor: pointer;
  width: 50px;
}

.audio-icon.next-discussion {
  width: 20px;
}

.player-controls {
  display: flex;
  position: relative;
  height: 100%;
  cursor: pointer;
}

.player-controls-container {
  display: flex;
  min-width: 275px;
}

.now-playing-title {
  font-size: 16px;
  font-weight: bold;
}

.now-playing-description {
  max-width: 850px;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-style: italic;
}

@media (max-width: 800px) {
  .now-playing-description {
    max-width: 850px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    font-style: italic;
  }
}

.podcast-thumbnail {
  width: 50px;
  height: auto;
}

.audio-content {
  padding-left: 15px;
}

a.audio-icon {
  cursor: pointer;
}

.loader {
  text-align: center;
}

.rate-speed {
  background: #f8f9fa;
  border: 1px solid #f8f9fa;
  cursor: pointer;
  margin: auto;
  font-weight: bold;
  font-size: 20px;
  width: initial;

  &:focus {
    border: none;
    box-shadow: none;
  }
}
</style>
