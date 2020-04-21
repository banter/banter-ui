<template>
  <div class="main-content">
    <h2>{{currentTopic.name}}</h2>
    <a @click="playAudio">Play!
        <AudioPlayer :isPlaying="isPlaying"/>
    </a>
    <b-list-group class="discussion-playlist">
      <b-list-group-item 
        href="#"
        class="discussion-playlist-item"
        v-for="(discussion, index) in currentTopic.playlist" 
        :key="`discussion-${index}`">

        <b-icon class="discussion-icon" icon="play"></b-icon>
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
  name: 'Home',
  components: {
    AudioPlayer
  },
  data() {
    return {
      isPlaying: false,
    }
  },
  computed: {
    ...mapGetters(['getTopic']),
    currentTopic: function() {
      return this.getTopic(this.$route.params.topicId)
    }
  },
  methods: {
    playAudio() {
      const playerStatus = this
      const sound = new Howl({
        html5: true,
        src: ['https://dts.podtrac.com/redirect.mp3/landmark.barstoolsports.net/pardon-my-take/37655/pmt-4-13-20-podcast-condensed.5bddc30f.mp3'],
        sprite: {
          test: [1000,2000]
        }

      });

      playerStatus.isPlaying = true;
      sound.on('end', function(){
        playerStatus.isPlaying = false;
      });

      sound.play('test');
    }
  }
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
