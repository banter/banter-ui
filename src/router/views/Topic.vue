<template>
  <div class="main-content">
    <div v-if="isLoading" class="loading-body">
      <LoadingSpinner :variant="'secondary'"/>
    </div>
    <div v-if="!isLoading">
      <TopicHeader :currentTopic="currentTopic"/>
      <b-list-group-item style="border: none" v-for="(discussion, index) in currentTopic.playlist"
        :key="`discussion-${index}`">
        <div>
          <DiscussionCard v-on:click.native="audioAction(discussion)" :discussion="discussion"
            :audioConfig="audioConfig"
            :isActiveDiscussion="isActiveDiscussion(discussion)"/>
        </div>
      </b-list-group-item>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import TopicHeader from '../../components/TopicHeader.vue';
import DiscussionCard from '../../components/DiscussionCard.vue';

export default {
  name: 'Topic',
  components: {
    LoadingSpinner,
    TopicHeader,
    DiscussionCard,
  },
  async mounted() {
    if (this.$route.params.topicName !== this.currentTopic.name) {
      await this.fetchTopic(this.$route.params.topicName);
    }
  },
  data() {
    return {
      displayIds: false,
      displayJson: false,
      showIds: true,
    };
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.topics.isRequesting,
      chosenTopic: (state) => state.topics.currentTopic,
      audioConfig: (state) => state.audio.audioConfig,
    }),
    currentTopic() {
      return this.chosenTopic;
    },
  },
  methods: {
    ...mapActions(['fetchTopic', 'pauseAudio', 'resumeAudio', 'createAudio', 'playAudio']),
    audioAction(discussion) {
      if (this.currentDiscussion?.discussionId === discussion?.discussionId) {
        if (this.audioConfig.playing()) {
          this.pauseAudio();
        } else {
          this.resumeAudio();
        }
      } else {
        this.createAudio(discussion);
      }
    },
    isActiveDiscussion(discussion) {
      if (!discussion?.discussionId || !this.currentDiscussion?.discussionId) return false;
      return this.currentDiscussion.discussionId === discussion.discussionId;
    },
  },
};
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
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
.discussion-playlist {
  margin-bottom: 60px;
}
.discussion-icon {
  cursor: pointer;
}
.playlist-toggle {
    display: flex;
}
.checkbox-label {
  margin-left: 5px;
}
.discussion-json {
  float: initial;
  text-align: initial;
}
.discussion-json:hover {
  cursor: initial;
}
.id-list li {
  display: block;
}
.tag-display a {
  color: white;
}
.tag-display span {
  margin: 2px;
}
.podcast-thumbnail {
  width: 20%;
  height: auto;
}
.discussion-top-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.discussion-text-content {
  display: flex;
  flex-direction: column;
  width: 70%;
}
</style>
