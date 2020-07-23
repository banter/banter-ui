<template>
  <b-button :disabled="topicsRequesting" @click="handleClick" variant="outline-primary">
      <div v-if="topicsRequesting">
        <LoadingSpinner :variant="'secondary'" />
      </div>
      <span v-else id="follow-button-text">{{isFollowing ? 'Unfollow' : 'Follow'}}</span>
  </b-button>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'FollowButton',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: {
    LoadingSpinner,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      followedTopics: (state) => state.users.followedTopics,
      topicsRequesting: (state) => state.users.topicsRequesting,
    }),
    isFollowing() {
      return !!this.followedTopics?.find((followedTopic) => followedTopic.id === this.topic.id);
    },
  },
  methods: {
    ...mapActions(['followTopic', 'unfollowTopic']),
    async handleClick() {
      if (!this.currentUser.email) {
        alert('pop auth modal');
      } else {
        if (this.isFollowing) {
          await this.unfollowTopic(this.topic);
        } else {
          await this.followTopic(this.topic);
        }
        this.$store.dispatch('fetchTopicsFollowed');
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
