<template>
  <div class="discussion-card-wrapper">
    <!-- border-variant="dark"  -->
    <b-card no-body
      class="overflow-hidden discussion-card"
      :style="isActiveDiscussion ? {'background':'lightgrey'} : {}"
      align="left">
      <b-row no-gutters>
        <b-col md="3">
          <div style="position:relative">
            <b-card-img class="discussion-card-image rounded-0" height="200px" alt="Image"
              :src="discussion.podcastThumbnailUrl">
              </b-card-img>
            <b-iconstack scale="3" class="discussion-icon">
              <b-icon stacked icon="circle-fill" variant="white"></b-icon>
              <b-icon stacked :icon="cardAudioIcon" variant="black"></b-icon>
              <b-icon stacked icon="circle" variant="white"></b-icon>
            </b-iconstack>
            <span v-if="cardAudioIcon === 'loading'" class="discussion-icon">
            <LoadingSpinner /></span>
            <div class="discussion-timestamp"
              :style="discussionTime(discussion)=='' ? {} : {'background-color':'black'}" >
              <p class="discussion-timestamp-text" style="margin-bottom:0px">
                {{`${discussionTime(discussion)}`}}
              </p>
            </div>
          </div>
        </b-col>
        <b-col md="9">
          <b-card-body>
            <b-row>
              <b-card-text class="podcast-description-text" style="{'margin-botton':'10px'}">
                {{discussion.description}}
              </b-card-text>
            </b-row>
            <b-row>
              <b-card-text class="podcast-name-text">
                {{`${discussion.podcastTitle}`}} •
                {{`${discussionAge(discussion)}`}}
              </b-card-text>
            </b-row>
            <b-row>
              <div class="tag-display">
                <b-icon icon="tag-fill"></b-icon>
                <b-badge v-for="tag in discussion.tags" :key="tag.id" variant="light">
                  <router-link :to="`/topics/${tag.value}`">
                    {{tag.value}}
                  </router-link>
                </b-badge>
                Play Count:{{discussion.playedCount}}
                Liked Count: {{discussion.likedCount}}
                <!-- Mark Listened: {{discussion.userListenProgress.markListened}}
                Progress Millis: {{discussion.userListenProgress.progressMillis}} -->
              </div>
            </b-row>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'DiscussionCard',
  components: {
    LoadingSpinner,
  },
  props: {
    isActiveDiscussion: {
      type: Boolean,
      required: true,
      default: false,
    },
    discussion: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    audioConfig: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState({
      isLoading: (state) => state.audio.isRequesting,
      audioIcon: (state) => state.audio.audioIcon,
    }),
    cardAudioIcon() {
      if (!this.isActiveDiscussion) return 'play';
      return this.audioIcon;
    },
    audioAction() {
      return this.isPlaying ? this.pauseAudio : this.playAudio;
    },
    isPlaying() {
      return !!(
        this.audioConfig && this.audioConfig.playing && this.audioConfig.playing(this.currentAudio)
      );
    },
  },

  methods: {
    discussionAge(discussion) {
      if (discussion?.episodePublishDate) {
        const dateObject = new Date(
          `${discussion.episodePublishDate.year}/${discussion.episodePublishDate.monthValue}/${discussion.episodePublishDate.dayOfMonth}`,
        );
        const dateString = dateObject.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        return this.$moment(dateString).fromNow();
      }
      return null;
    },
    discussionTime(discussion) {
      const duration = this.$moment.utc(this.$moment.duration(discussion.duration).as('milliseconds')).format('m:ss');
      return duration === '0:00' ? '' : duration;
    },
  },
};

</script>

<style lang="scss" scoped>

.discussion-icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    opacity: .80;
}

.discussion-card-wrapper {
  margin: auto;
  width: fit-content;
  cursor: pointer;
  padding: 5px;
}

.discussion-card{
    max-width: 785px;
    min-width: 240px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.4);

}

.podcast-name-text{
      size: 100px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    /* identical to box height, or 145% */
    letter-spacing: 0.2px;
    color: #606060;
}
.podcast-description-text {
  font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 26px;
margin-bottom: 12px!important;
/* or 142% */
letter-spacing: 0.2px;
color: #030303;
}

.card-img.discussion-card-image {
  object-fit: contain;
  position: relative;
  padding: 15px;

  .podcast-image {
        position: absolute;
    object-fit: cover;
    max-width: 100%;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    border-radius: 25px;
  }
}

  .discussion-timestamp {
      position: absolute;
    top: 85%;
    transform: translate(-85%, -85%);
    left: 85%;
    opacity: .80;
    opacity: .95;
    border-radius: 5px;
    // background-color: black;
    color: white;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .discussion-timestamp-text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    height: 100%;
  }

.tag-display a {
  font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 17px;
line-height: 15px;
/* or 91% */

display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.2px;
color: #030303;
}

.tag-display span {
  margin: 2px;
}

</style>
