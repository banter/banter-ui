<template>
<div>
  <b-button :disabled="followRequesting"
  @click="handleClick" variant="outline-primary">
      <span v-if="followRequesting"
        id="follow-button-text">{{isFollowing ? 'Follow' : 'Unfollow'}}</span>
      <span v-else
        id="follow-button-text">{{isFollowing ? 'Unfollow' : 'Follow'}}</span>
  </b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MODALS from '../constants/modals';

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
      followRequesting: (state) => state.users.followRequesting,
    }),
    isFollowing() {
      return !!this.followedTopics?.find((followedTopic) => followedTopic.id === this.topic.id);
    },
  },
  methods: {
    ...mapActions(['followTopic', 'unfollowTopic']),
    async handleClick() {
      if (!this.currentUser.email) {
        console.log(MODALS);
        this.$bvModal.show(MODALS.FOLLOW_AUTH_MODAL);
      } else if (this.isFollowing) {
        await this.unfollowTopic(this.topic);
      } else {
        await this.followTopic(this.topic);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
