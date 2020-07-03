<template>
  <div class="main-content">
    <div v-if="!isLoading">
      <div>
        <TopicHeader :currentTopic="currentTopic"/>
      </div>
      <div class="playlist-toggle">
        <input type="checkbox" id="ids" v-model="displayIds">
        <label class="checkbox-label" for="ids">Display Ids</label>
      </div>
      <div class="playlist-toggle">
        <input type="checkbox" id="json" v-model="displayJson">
        <label class="checkbox-label" for="json">Display </label>
      </div>

        <b-list-group-item 
        style="border: none"
          v-for="(discussion, index) in currentTopic.playlist" 
          :key="`discussion-${index}`">
          <div>
                <DiscussionCard  v-on:click.native="audioAction(discussion)" :discussion="discussion" :icon="((currentDiscussion && currentDiscussion.discussionId) === discussion.discussionId) ? 'pause ': 'play'"/>
          </div>
          <p v-if="displayIds" class="mb-1">
            <ul class="id-list">
              <li><b>Discussion:</b> {{discussion.discussionId}}</li>
              <li><b>Episode:</b> {{discussion.episodeId}}</li>
              <li><b>Podcast:</b> {{discussion.podcastId}}</li>
            </ul>
          </p>
          <p v-if="displayJson" class="mb-1">
            <code><pre class="discussion-json">{{discussion}}</pre></code>
          </p>
        </b-list-group-item>
    </div>
    <div>
      <LoadingSpinner :variant="'secondary'" v-if="isLoading"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingSpinner from "../../components/LoadingSpinner";
import TopicHeader from "../../components/TopicHeader";
import DiscussionCard from "../../components/DiscussionCard";

export default {
  name: 'Topic',
  components: {
    LoadingSpinner, 
    TopicHeader,
    DiscussionCard
  },
  created () {
    this.fetchTopic(this.$route.params.topicName)
  },
  async mounted () {
    if (this.$route.params.topicName !== this.currentTopic.name) {
      await this.fetchTopic(this.$route.params.topicName)
      const newPlaylist = this.currentTopic?.playlist
      this.createAudio(newPlaylist[0])
    }
  },
  data() {
    return {
      displayIds: false,
      displayJson: false,
      showIds: true
    }
  },
  computed: {
    ...mapState({
      currentDiscussion: state => state.audio.currentDiscussion,
      isLoading: state => state.topics.isRequesting,
      chosenTopic: state => state.topics.currentTopic
    }),
    currentTopic: function() {
      console.log("Getting Current Topic")
      console.log(this.chosenTopic)
      return this.chosenTopic
    }
  },
  methods: {
    ...mapActions(['fetchTopic', 'pauseAudio', 'createAudio']),
    audioAction(discussion) {
      (this.currentDiscussion && this.currentDiscussion.discussionId) === discussion.discussionId
      ? this.pauseAudio()
        : this.createAudio(discussion)
    },
    discussionDate(discussion){
      if (discussion?.episodePublishDate) {
        return this.$moment(`${discussion.episodePublishDate.monthValue}-${discussion.episodePublishDate.dayOfMonth}-${discussion.episodePublishDate.year}`)
      } else {
        return null
      }
    }
  },
}
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
