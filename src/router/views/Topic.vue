<template>
  <div class="main-content">
    <h2>{{currentTopic.name}}</h2>
      <AudioPlayer :discussion="currentDiscussion" :pauseAudio="pauseAudio" :playAudio="playAudio" :isPlaying="isPlaying"/>
    <b-list-group class="discussion-playlist">
      <b-list-group-item 
        @click="() => playAudio(discussion)"
        class="discussion-playlist-item"
        v-for="(discussion, index) in currentTopic.playlist" 
        :key="`discussion-${index}`">

        <b-icon font-scale="3" class="discussion-icon" icon="play"></b-icon>
        <router-link to="#">{{ discussion.title }}</router-link>
      </b-list-group-item>
    </b-list-group>
    <br>
    <br>
    <br>
    <h4>data dump:</h4>
    <span>{{currentTopic}}</span>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Howl } from 'howler';

import AudioPlayer from "../../components/AudioPlayer";

export default {
  name: 'Topic',
  components: {
    AudioPlayer
  },
  data() {
    return {
      currentDiscussion: null,
      currentAudio: null,
      audioConfig: null,
    }
  },
  computed: {
    ...mapGetters(['getTopic']),
    currentTopic: function() {
      return this.getTopic(this.$route.params.topicId)
    },
    isPlaying: function() {
      return !!(this.audioConfig && this.audioConfig.playing(this.currentAudio))
    }
  },
  methods: {
    playAudio(discussion = this.currentTopic.playlist[0]) {
      this.killAudio();

      const playerStatus = this
      this.currentDiscussion = discussion

      this.audioConfig = new Howl({
        html5: true,
        src: discussion.audioUrl,
        sprite: {
          clip: [discussion.startTime, discussion.endTime]
        }
      });

      this.audioConfig.on('end', function(){
        playerStatus.currentAudio = null;
      });

      this.currentAudio = this.audioConfig.play('clip');
    },
    pauseAudio() {
      this.audioConfig.pause(this.currentAudio)
    },
    killAudio() {
      this.audioConfig && this.audioConfig.unload(this.currentAudio)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  float: left;
}
</style>
