<template>
  <a>
    <div class="audio-player-container">
      <h5 class="now-playing-title" v-if="discussion">Now Playing: {{discussion.title}}</h5>
      <b-icon @click="() => audioAction()" font-scale="3" class="discussion-icon" :icon="audioIcon"></b-icon>
    </div>
  </a>
</template>

<script>
export default {
  name: 'AudioPlayer',
    props: {
      discussion: {
        type: Object,
        required: false,
        default: () => {}
      },
      isPlaying: {
        type: Boolean,
        required: true,
        default: false
      },
      playAudio: {
        type: Function,
        required: true,
        default: () => {}
      },
      pauseAudio: {
        type: Function,
        required: true,
        default: () => {}
      }
    },
    computed: {
      audioIcon: function() {
        return this.isPlaying ? 'pause' : 'play'
      },
      audioAction: function() {
        return this.isPlaying ? this.pauseAudio : this.playAudio
      }
    },
  }
</script>

<style scoped>
  .now-playing-title {
    font-size: 18px;
  }
</style>
