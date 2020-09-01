<template>
  <div :class="isMobile ? 'main-content-mobile':'main-content'">
    <div v-if="isLoading" class="loading-body">
      <LoadingSpinner :variant="'secondary'"/>
    </div>
    <div v-if="!isLoading">
      <div v-if="playlistExists > 0">
      <discussion-playlist :collection="discussion"></discussion-playlist>
      </div>
      <div v-else>
        <empty-page-handler></empty-page-handler>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import DiscussionPlaylist from '../../containers/DiscussionPlaylist.vue';
import EmptyPageHandler from '../../components/commons/EmptyPageHandler.vue';

export default {
  name: 'Discussion',
  components: {
    LoadingSpinner,
    DiscussionPlaylist,
    EmptyPageHandler,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      logo: window.location.origin + require('../../assets/Banter_logo_dark.png'),
    };
  },
  metaInfo() {
    return {
      title: 'Banter',
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'Banter' },
        { name: 'twitter:title', content: 'Banter Discussion Page' },
        { name: 'twitter:description', content: 'The new way to listen to sports talk' },
        // image must be an absolute path
        { name: 'twitter:image', content: this.logo },
        // Facebook OpenGraph
        { property: 'og:title', content: 'Banter Discussion Page' },
        { property: 'og:site_name', content: 'Banter' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.logo },
        { property: 'og:description', content: 'The new way to listen to sports talk.' },
      ],
    };
  },
  async mounted() {
    await this.fetchDiscussionById(this.$route.params.discussionId);
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.listen.isRequesting,
      isMobile: (state) => state.sizing.isMobile,
      discussion: (state) => state.listen.discussion,
    }),
    playlistExists() {
      return !!this.discussion?.playlist?.length;
    },
  },
  methods: {
    ...mapActions(['fetchDiscussionById']),
  },
};
</script>
<style scoped>
.main-content {
  margin: auto;
  width: 80%;
  margin-bottom: 100px;
}

.main-content-mobile {
  margin: auto;
  width: 90%;
  margin-bottom: 100px;
}

.loading-body {
    position: relative;
    margin-left: 50%;
    margin-right: 50%;
}
</style>
