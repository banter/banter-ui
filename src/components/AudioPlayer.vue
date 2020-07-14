<template>
  <div class="audio-player">

    <nav class="navbar navbar-light navbar-expand-md bg-light justify-content-center fixed-bottom">
      <b-navbar-brand class="navbar-brand d-flex mr-auto" style="width:33%">
        <b-navbar-nav>
          <a title="Rewind 15 seconds" @click="() => goBack15Seconds()" font-scale="3"
            class="audio-icon"><b>15
              <b-icon font-scale="1" :icon="'arrow-counterclockwise'" /></b></a>
        </b-navbar-nav>
        <b-navbar-nav>
          <div class="audio-icon loader" v-if="audioIcon === 'loading'"><LoadingSpinner /></div>
          <b-icon v-else @click="audioAction" font-scale="3" class="audio-icon" :icon="audioIcon"/>
        </b-navbar-nav>
        <b-navbar-nav>
          <a title="Fast Forward 15 seconds" @click="() => goForward15Seconds()" font-scale="3"
            class="audio-icon"><b>
              <b-icon font-scale="1" :icon="'arrow-clockwise'" />15</b></a>
        </b-navbar-nav>
        <b-navbar-nav>
          <a title="Next discussion" @click="() => goToNextDiscussion()" font-scale="3"
            class="audio-icon ml-sm-2"><b>
              <b-icon :icon="'skip-end-fill'" /></b></a>
        </b-navbar-nav>
      </b-navbar-brand>
      <b-navbar-toggle target="audio-collapse"></b-navbar-toggle>

      <b-collapse id="audio-collapse" is-nav>

        <b-navbar-nav class="navbar-nav w-100 justify-content-center">
          <span v-if="isPlaying">({{remainingTime ? remainingTime   : ''}})</span>
        </b-navbar-nav>

        <b-navbar-nav class="navbar-nav w-100 ml-auto justify-content-end">
          <b-nav-item>
            <span><img class="podcast-thumbnail" :src="discussion.podcastThumbnailUrl" /></span>
          </b-nav-item>
          <b-nav-item>
            <span class="now-playing-title" v-if="discussion">
              {{`${discussion.podcastTitle} (${episodeDate.format("MMM DD, YYYY")})`}}
            </span>
            <span class="now-playing-description"
              v-if="discussion">{{discussion.description}}</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'AudioPlayer',
  components: {
    LoadingSpinner,
  },
  mounted() {
    this.trackInterval = setInterval(() => {
      this.getRemainingTime();
    }, 750);
    this.getRemainingTime();
  },
  destroyed() {
    clearInterval(this.trackInterval);
  },
  watch: {
    timestampRemaining(newVal) {
      const duration = this.$moment.duration((newVal || 0), 'milliseconds');
      this.remainingTime = this.$moment.utc(duration.as('milliseconds')).format('HH:mm:ss');
    },
  },
  computed: {
    ...mapState({
      timestampRemaining: (state) => state.audio.timestampRemaining,
      isLoading: (state) => state.audio.isRequesting,
      audioConfig: (state) => state.audio.audioConfig,
      currentAudio: (state) => state.audio.currentAudio,
      discussion: (state) => state.audio.currentDiscussion,
      audioIcon: (state) => state.audio.audioIcon,
      chosenTopic: (state) => state.topics.currentTopic,
    }),
    audioAction() {
      return this.isPlaying ? this.pauseAudio : this.playAudio;
    },
    episodeDate() {
      if (this?.discussion?.episodePublishDate) {
        return this.$moment(`${this.discussion.episodePublishDate.monthValue}-${this.discussion.episodePublishDate.dayOfMonth}-${this.discussion.episodePublishDate.year}`);
      }
      return null;
    },
    isPlaying() {
      return !!(this.audioConfig && this.audioConfig.playing
        && this.audioConfig.playing(this.currentAudio));
    },
  },
  data() {
    return {
      remainingTime: '00:00:00',
    };
  },
  methods: {
    ...mapActions(['playAudio', 'pauseAudio', 'goForward15Seconds', 'goBack15Seconds', 'goToNextDiscussion', 'goToEndOfDiscussion', 'getRemainingTime', 'goTostartOfDiscussion']),
  },
};
</script>

<style scoped>

.fixed-bottom {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
}

  .audio-player {
    margin: auto;
  }

  .audio-icon {
    margin:auto;
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

  .audio-icon {
    cursor: pointer;
    width: 50px;
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

  a.audio-icon {
    cursor: pointer;
  }

  .loader {
    text-align: center;
  }
</style>
