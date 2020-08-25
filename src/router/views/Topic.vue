<template>
  <div :class="isMobile ? 'main-content-mobile':'main-content'">
    <div v-if="isLoading" class="loading-body">
      <LoadingSpinner :variant="'secondary'"/>
    </div>
    <div v-if="!isLoading">
      <div v-if="playlistExists > 0">
      <TopicHeader :currentTopic="currentTopic"/>
      <discussion-playlist :collection="currentTopic"></discussion-playlist>
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
import TopicHeader from '../../components/TopicHeader.vue';
import DiscussionPlaylist from '../../containers/DiscussionPlaylist.vue';
import EmptyPageHandler from '../../components/commons/EmptyPageHandler.vue';

export default {
  name: 'Topic',
  components: {
    LoadingSpinner,
    TopicHeader,
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
        { name: 'twitter:title', content: `Banter Topic Page - ${this.formatUrlParam(this.$route.params.topicName)}` },
        { name: 'twitter:description', content: 'The new way to listen to sports talk' },
        // image must be an absolute path
        { name: 'twitter:image', content: this.logo },
        // Facebook OpenGraph
        { property: 'og:title', content: `Banter Topic Page - ${this.formatUrlParam(this.$route.params.topicName)}` },
        { property: 'og:site_name', content: 'Banter' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: this.logo },
        { property: 'og:description', content: 'The new way to listen to sports talk.' },
      ],
    };
  },
  async mounted() {
    const formattedTopicName = this.formatUrlParam(this.$route.params.topicName);
    if (formattedTopicName !== this.currentTopic.name) {
      if (this?.$route?.params?.topicId) {
        await this.fetchTopicById(this.$route.params.topicId);
      } else {
        await this.fetchTopicByName(formattedTopicName);
      }
    }
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.topics.isRequesting,
      isMobile: (state) => state.sizing.isMobile,
      chosenTopic: (state) => state.topics.currentTopic,
    }),
    currentTopic() {
      return this.chosenTopic;
    },
    playlistExists() {
      return !!this.currentTopic?.playlist?.length;
    },
  },
  methods: {
    ...mapActions(['fetchTopicByName', 'fetchTopicById']),
    formatUrlParam(topicName) {
      const words = topicName.match(/([^-]+)/g) || [];
      words.forEach((word, i) => {
        words[i] = word[0].toUpperCase() + word.slice(1);
      });
      return words.join(' ');
    },
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
