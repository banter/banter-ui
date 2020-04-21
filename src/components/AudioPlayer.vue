<template>
  <div class="audio-player-container">
    <b-icon v-if="!isPlaying" class="discussion-icon" icon="play"></b-icon>
    <b-icon v-if="isPlaying" class="discussion-icon" icon="pause"></b-icon>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
    props: {
      isPlaying: {
        type: Boolean,
        required: true,
        default: false
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
