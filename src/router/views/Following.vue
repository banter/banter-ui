<template>
  <div class="main-content">
    <div v-if="isLoading" class="loading-body">
      <LoadingSpinner :variant="'secondary'" />
    </div>
    <div v-if="!isLoading">
      <div v-if="followingTopics.playlist && followingTopics.playlist.length > 0">
        <TopicHeader :useDefaultImage="useDefaultImage" :currentTopic="followingTopics">
            <h3 class="header-card-text-content">Following Page</h3>
        </TopicHeader>
        <b-list-group-item style="border: none" v-for="(discussion, index)
      in followingTopics.playlist" :key="`discussion-${index}`">
            <DiscussionCard v-on:click.native="audioAction(discussion)" :discussion="discussion"
              :audioConfig="audioConfig" :isActiveDiscussion="isActiveDiscussion(discussion)" />
        </b-list-group-item>
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
import TopicHeader from '../../components/TopicHeader.vue';
import DiscussionCard from '../../components/DiscussionCard.vue';
import EmptyPageHandler from '../../components/commons/EmptyPageHandler.vue';

export default {
  name: 'Following',
  components: {
    LoadingSpinner,
    TopicHeader,
    DiscussionCard,
    EmptyPageHandler,
  },
  async mounted() {
    // Checking if followingTopics has already been fetched
    if (!this.followingTopics.playlist) {
      await this.fetchFollowingTopics();
    }
  },
  data() {
    return {
      displayIds: false,
      displayJson: false,
      showIds: true,
      useDefaultImage: true,
    };
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.topics.isRequestingFollowing,
      followingTopics: (state) => state.topics.followingTopics,
      audioConfig: (state) => state.audio.audioConfig,
    }),
  },
  methods: {
    ...mapActions(['fetchFollowingTopics', 'pauseAudio', 'resumeAudio', 'createAudio', 'playAudio']),
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
