<template>
  <div class="main-content">
    <div v-if="!isLoading">
      <h2>{{currentTopic.name}}</h2>
        <AudioPlayer v-if="audioConfig" :discussion="currentDiscussion" :pauseAudio="pauseAudio" :playAudio="playAudio" :trackTime="trackTime" :isPlaying="isPlaying"/>
      <div class="playlist-toggle">
        <input type="checkbox" id="description" v-model="displayDescription">
        <label class="checkbox-label" for="description">Display Description</label>
      </div>
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

          <b-icon @click="() => audioAction(discussion)" font-scale="3" class="discussion-icon" :icon="((currentDiscussion && currentDiscussion.discussionId) === discussion.discussionId) ? 'pause ': 'play'"></b-icon>
          <router-link to="#">
            <div class="d-flex w-100 justify-content-between flex-column">
              <h4 class="mb-1">{{discussion.podcastTitle}}</h4>
              <h5 class="mb-1">{{discussion.episodeTitle}}</h5>
              <h6 class="mb-1">{{discussion.startTime}}-{{discussion.endTime || 'End'}}</h6>
            </div>
          </router-link>
          <p v-if="displayDescription" class="mb-1">
            {{discussion.description}}
          </p>
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
  data() {
    return {
      trackInterval: null,
      trackTime: 0,
      displayDescription: true,
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
    }
  },
  methods: {
    ...mapActions(['fetchTopic', 'playAudio', 'pauseAudio', 'createAudio', 'killAudio']),
    audioAction(discussion) {
      (this.currentDiscussion && this.currentDiscussion.discussionId) === discussion.discussionId
        ? this.pauseAudio()
        : this.createAudio(discussion)
    },
    playlistItemText(discussion) {
      return this.displayDescription ? '' : `${discussion.podcastTitle} (${discussion.episodeTitle}) (${discussion.startTime}-${discussion.endTime || 'End'})`
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

.discussion-icon {
  position: absolute;
  left: 0;
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
</style>
