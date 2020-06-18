<template>
  <div class="main-content">
    <div v-if="!isLoading">
      <h2>{{currentTopic.name}}</h2>
      <AudioPlayer v-if="audioConfig" :discussion="currentDiscussion" :pauseAudio="pauseAudio" :playAudio="playAudio" :trackTime="trackTime" :isPlaying="isPlaying" :episodeDate="episodeDate"/>
      <div class="playlist-toggle">
        <input type="checkbox" id="ids" v-model="displayIds">
        <label class="checkbox-label" for="ids">Display Ids</label>
      </div>
      <div class="playlist-toggle">
        <input type="checkbox" id="json" v-model="displayJson">
        <label class="checkbox-label" for="json">Display JSON</label>
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
                <img class="podcast-thumbnail" :src="discussion.podcastThumbnailUrl"/>
                <div class="discussion-text-content">
                  <h5 class="mb-1">{{`${discussion.podcastTitle}`}}</h5>
                  <p class="mb-1">{{`${episodeDate && episodeDate.format("MMM DD") + ' - '}`}}{{discussion.description}} ({{discussion.startTime}}-{{discussion.endTime || 'End'}})</p>
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

import AudioPlayer from "../../components/AudioPlayer";
import LoadingSpinner from "../../components/LoadingSpinner";

export default {
  name: 'Topic',
  components: {
    AudioPlayer,
    LoadingSpinner
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
      trackInterval: null,
      trackTime: 0,
      displayIds: false,
      displayJson: false,
      showIds: true
    }
  },
  computed: {
    ...mapState({
      audioConfig: state => state.audio.audioConfig,
      currentAudio: state => state.audio.currentAudio,
      currentDiscussion: state => state.audio.currentDiscussion,
      isLoading: state => state.topics.isRequesting,
      chosenTopic: state => state.topics.currentTopic
    }),
    currentTopic: function() {
      return this.chosenTopic
    },
    isPlaying: function() {
      return !!(this.audioConfig && this.audioConfig.playing && this.audioConfig.playing(this.currentAudio))
    },
    episodeDate:function() {
      if (this?.currentDiscussion?.episodePublishDate) {
        return this.$moment(`${this.currentDiscussion.episodePublishDate.monthValue}-${this.currentDiscussion.episodePublishDate.dayOfMonth}-${this.currentDiscussion.episodePublishDate.year}`)
      } else {
        return null
      }
    }
  },
  methods: {
    ...mapActions(['fetchTopic', 'playAudio', 'pauseAudio', 'createAudio', 'killAudio']),
    audioAction(discussion) {
      (this.currentDiscussion && this.currentDiscussion.discussionId) === discussion.discussionId
        ? this.pauseAudio()
        : this.createAudio(discussion)
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
  width: 600px;
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
