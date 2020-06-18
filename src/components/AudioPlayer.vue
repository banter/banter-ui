<template>
  <div class="audio-player">
    <div class="audio-player-container">
      <div class="player-controls-container">
        <div class="player-controls">
          <a title="Back to start" @click="() => goTostartOfDiscussion()" font-scale="3"><b>0<b-icon font-scale="1" :icon="'arrow-return-left'" /></b></a>
        </div>
        <div class="player-controls">
          <a title="Back to start" @click="() => goBack15Seconds()" font-scale="3"><b>15<b-icon font-scale="1" :icon="'arrow-counterclockwise'" /></b></a>
        </div>
        <div class="player-controls">
          <b-icon @click="() => audioAction()" font-scale="3" class="discussion-icon" :icon="audioIcon"></b-icon>
        </div>
        <div class="player-controls">
          <a title="Go to end of discussion" @click="() => goForward15Seconds()" font-scale="3"><b><b-icon font-scale="1" :icon="'arrow-clockwise'" />15</b></a>
        </div>
        <div class="player-controls">
          <a title="Go to end of discussion" @click="() => goToEndOfDiscussion()" font-scale="3"><b><b-icon font-scale="1" :icon="'arrow-return-right'" />:05</b></a>
        </div>
        <div class="player-controls">
          <a title="Next discussion" @click="() => goToNextDiscussion()" font-scale="3"><b><b-icon :icon="'skip-end-fill'"/></b></a>
        </div>
      </div>
      <div class="audio-timeline">
        <span v-if="!isPlaying && isLoading"><LoadingSpinner/></span>
        <span v-if="isPlaying">({{remainingTime ? remainingTime   : ''}})</span>  
      </div>
      <div class="audio-description">
        <div class="audio-image">
          <span><img class="podcast-thumbnail" :src="discussion.podcastThumbnailUrl"/></span>
        </div>
        <div class="audio-content">
          <span class="now-playing-title" v-if="discussion">{{`${discussion.podcastTitle} (${episodeDate.format("MMM DD, YYYY")})`}}</span>
          <span class="now-playing-description" v-if="discussion">{{discussion.description}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingSpinner from "./LoadingSpinner";

export default {
  name: 'AudioPlayer',
    components: {
      LoadingSpinner
    },
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
      trackTime: {
        type: Number,
        required: true,
        default: 0
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
    mounted() {
      this.trackInterval = setInterval(() => {
        this.getRemainingTime()
      }, 750);
        this.getRemainingTime()
    },
    destroyed() {
      clearInterval(this.trackInterval);
    },
    watch: {
      timestampRemaining(newVal) {
        const duration = this.$moment.duration((newVal || 0), 'milliseconds');
        this.remainingTime = this.$moment.utc(duration.as('milliseconds')).format('HH:mm:ss')
      }
    },
    computed: {
      ...mapState({
        timestampRemaining: state => state.audio.timestampRemaining,
        isLoading: state => state.audio.isRequesting
      }),
      audioIcon: function() {
        return this.isPlaying ? 'pause' : 'play'
      },
      audioAction: function() {
        return this.isPlaying ? this.pauseAudio : this.playAudio
      },
      episodeDate:function() {
        if (this?.discussion?.episodePublishDate) {
          return this.$moment(`${this.discussion.episodePublishDate.monthValue}-${this.discussion.episodePublishDate.dayOfMonth}-${this.discussion.episodePublishDate.year}`)
        } else {
          return null
        }
      }
    },
    data() {
      return {
        remainingTime: '00:00:00'
      }
    },
    methods: {
      ...mapActions(['goForward15Seconds', 'goBack15Seconds', 'goToNextDiscussion', 'goToEndOfDiscussion', 'getRemainingTime', 'goTostartOfDiscussion']),
    }
  }
</script>

<style scoped>
  .audio-player {
    position: fixed;
    z-index: 1;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    border-top: 1px solid #cecece;
  }

  .audio-player-container {
    padding: 0;
    display: flex;
  }

  .audio-description {
    display: flex;
  }

  .audio-player-container div {
    margin: auto;
  }

  .player-controls {
    display: flex;
    position: relative;
    height: 100%;
    cursor: pointer;
  }

  .player-controls-container {
    display: flex;
    min-width: 275px;
  }

  .now-playing-title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .now-playing-description {
    max-width: 850px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-style: italic;
  }

  .podcast-thumbnail {
    width: 50px;
    height: auto;
  }
  
  .audio-content {
    padding-left: 15px;
  }
</style>
