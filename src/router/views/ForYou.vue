<template>
  <div class="main-content">
    <div v-if="isLoading" class="loading-body">
      <LoadingSpinner :variant="'secondary'" />
    </div>
    <div v-if="!isLoading">
      <div v-if="playlistExists > 0">
        <ForYouHeader :useDefaultImage="useDefaultImage" :currentTopic="followingTopics">
            <h3 class="header-card-text-content">For You</h3>
        </ForYouHeader>
      <discussion-playlist :collection="forYou"></discussion-playlist>
      </div>
        <div v-else>
          <empty-page-handler>
              Oh No! You aren't following any topics yet. Try navigating from our homepage
              to follow different pages.
          </empty-page-handler>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import ForYouHeader from '../../components/ForYouHeader.vue';
import DiscussionPlaylist from '../../containers/DiscussionPlaylist.vue';
import EmptyPageHandler from '../../components/commons/EmptyPageHandler.vue';

export default {
  name: 'ForYou',
  components: {
    LoadingSpinner,
    ForYouHeader,
    DiscussionPlaylist,
    EmptyPageHandler,
  },
  async mounted() {
    // TODO Discuss if this should be ran every time we visit the page?
    await this.fetchForYou();
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.forYou.isRequestingForYou,
      forYou: (state) => state.forYou.forYou,
    }),
    playlistExists() {
      return !!this.forYou?.playlist?.length;
    },
  },
  methods: {
    ...mapActions(['fetchForYou']),
  },
};
</script>
<style scoped>
.main-content {
  margin: auto;
  width: 80%;
  margin-top: 50px;
  margin-bottom: 100px;
}
.loading-body {
    position: relative;
    margin-left: 50%;
    margin-right: 50%;
}
</style>
