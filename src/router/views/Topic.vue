<template>
  <div class="main-content">
    <div v-if="!isLoading">
      <div>
        <TopicHeader type="carousel-card"/>
      </div>
      <div>
        zfcdafsdfsdfdsf
        <DiscussionCard type="carousel-card"/>
      </div>
      <h2>{{currentTopic.name}}</h2>
      <div class="playlist-toggle">
        <input type="checkbox" id="ids" v-model="displayIds">
        <label class="checkbox-label" for="ids">Display Ids</label>
      </div>
      <div class="playlist-toggle">
        <input type="checkbox" id="json" v-model="displayJson">
        <label class="checkbox-label" for="json">Display </label>
      </div>
      <b-list-group class="discussion-playlist">
        <b-list-group-item 
          class="discussion-playlist-item"
          v-for="(discussion, index) in currentTopic.playlist" 
          :key="`discussion-${index}`">

          <div>
            <div class="d-flex w-100 justify-content-between flex-column">
              <div class="discussion-top-row">
                <b-icon @click="() => audioAction(discussion)" font-scale="3" class="discussion-icon" :icon="((currentDiscussion && currentDiscussion.discussionId) === discussion.discussionId) ? 'pause ': 'play'"></b-icon>
                <!-- <Discussion :discussion="discussion" :icon="((currentDiscussion && currentDiscussion.discussionId) === discussion.discussionId) ? 'pause ': 'play'">  -->
                <img class="podcast-thumbnail" :src="discussion.podcastThumbnailUrl"/>
                <div class="discussion-text-content">
                  <h5 class="mb-1">{{`${discussion.podcastTitle}`}}</h5>
                  <p class="mb-1">{{`${discussionDate(discussion) && discussionDate(discussion).format("MMM DD") + ' - '}`}}{{discussion.description}} ({{discussion.startTime}}-{{discussion.endTime || 'End'}})</p>
                </div>
              </div>
            </div>
          </div>
          <div class="tag-display">
            <b-badge v-for="tag in discussion.tags" :key="tag.id" variant="primary">
              <router-link :to="`/topics/${tag.value}`">
                {{tag.value}}
              </router-link>    
            </b-badge>
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
      </b-list-group>
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
