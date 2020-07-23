<template>
  <b-button @click="handleClick" variant="outline-primary" class="follow-button">
      <span id="follow-button-text">{{isFollowing ? 'Unfollow' : 'Follow'}}</span>
  </b-button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FollowButton',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      followedTopics: (state) => state.users.followedTopics,
    }),
    isFollowing() {
      return !!this.followedTopics?.find((followedTopic) => followedTopic.id === this.topic.id);
    },
  },
  methods: {
    ...mapActions(['followTopic', 'unfollowTopic']),
    handleClick() {
      if (!this.currentUser.email) {
        alert('pop auth modal');
      } else if (this.isFollowing) {
        this.unfollowTopic(this.topic);
      } else {
        this.followTopic(this.topic);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
