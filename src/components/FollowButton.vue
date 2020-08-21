<template>
  <div>
    <b-button v-if="!isOnboardingButton" :disabled="followRequestingThisTopic" @click="handleClick"
      :variant="variant">
      <span v-if="followRequestingThisTopic"
        id="follow-button-text">{{isFollowing ? 'Follow' : 'Unfollow'}}</span>
      <span v-else id="follow-button-text">{{isFollowing ? 'Unfollow' : 'Follow'}}</span>
    </b-button>

    <b-button v-else
   :variant="isFollowing ? 'primary' : 'outline-primary'"
     :disabled="followRequestingThisTopic" @click="handleClick"
      role="button">
      <span id="follow-button-text">{{topic.value}}</span>
    </b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MODALS from '../constants/modals';

export default {
  name: 'FollowButton',
  props: {

    isOnboardingButton: {
      type: Boolean,
      required: false,
      default: false,
    },

    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    variant: {
      type: String,
      required: false,
      default: 'outline-primary',
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      followedTopics: (state) => state.users.followedTopics,
      followRequesting: (state) => state.users.followRequesting,
      toggledFollowTopic: (state) => state.users.toggledFollowTopic,
    }),
    isFollowing() {
      return !!this.followedTopics?.find((followedTopic) => followedTopic.id === this.topic.id);
    },
    followRequestingThisTopic() {
      return this.followRequesting && this.toggledFollowTopic?.id === this.topic?.id;
    },
  },
  methods: {
    ...mapActions(['followTopic', 'unfollowTopic']),
    async handleClick() {
      if (!this.currentUser.email) {
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

<style lang="scss" scoped>

.following-button{

}

.not-following-button{

}

</style>
