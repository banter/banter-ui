<template>
  <div>
    <b-list-group-item style="border: none; padding: 0.75rem;"
    v-for="(discussion, index) in collection.playlist"
      :key="`discussion-${index}`">
      <div>
        <DiscussionCard v-on:click.native="audioAction(discussion)" :discussion="discussion"
          :audioConfig="audioConfig" :isActiveDiscussion="isActiveDiscussion(discussion)" />
      </div>
    </b-list-group-item>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import DiscussionCard from '../components/DiscussionCard.vue';

export default {
  name: 'DiscussionPlaylist',
  components: {
    DiscussionCard,
  },
  props: {
    collection: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
    isAutoPlayEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      displayIds: false,
      displayJson: false,
      showIds: true,
    };
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      isLoading: (state) => state.topics.isRequesting,
      audioConfig: (state) => state.audio.audioConfig,
    }),
  },
  mounted() {
    setTimeout(() => {
      if (this.isAutoPlayEnabled) { this.audioAction(this.collection?.playlist[0]); }
    }, 600);
  },
  methods: {
    ...mapActions(['pauseAudio', 'resumeAudio', 'createAudio']),
    ...mapMutations(['alterTopic']),
    audioAction(discussion) {
      if (this.currentDiscussion?.discussionId === discussion?.discussionId) {
        if (this.audioConfig.playing()) {
          this.pauseAudio();
        } else {
          this.resumeAudio();
        }
      } else {
        this.alterTopic(this.collection);
        this.createAudio(discussion);
      }
    },
    isActiveDiscussion(discussion) {
      if (!discussion?.discussionId || !this.currentDiscussion?.discussionId) return false;
      return this.currentDiscussion.discussionId === discussion.discussionId;
    },
  },
};
</script>
<style scoped>
</style>
