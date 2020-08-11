<template>
  <div class="main-content">
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
.loading-body {
    position: relative;
    margin-left: 50%;
    margin-right: 50%;
}
</style>
