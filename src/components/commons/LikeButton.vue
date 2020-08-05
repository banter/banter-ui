<template>
  <div class="like-button-wrapper">
    <div :aria-disabled="likesRequesting" @click="handleClick" class="navbar-brand d-flex m-auto">
      <b-icon :icon="isLiked ? 'heart-fill':'heart'"
      font-scale="1.2" :class="isLiked ? 'red-like-button':'black-like-button'"/>
      <span v-if="showLikes" class="like-count">{{discussion.likedCount}}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MODALS from '../../constants/modals';

export default {
  name: 'LikeButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'hand-thumbs-up',
    },
    showLikes: {
      type: Boolean,
      required: false,
      default: false,
    },
    discussion: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      isTogglingLike: false,
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      discussionsLiked: (state) => state.actions.discussionsLiked,
      likesRequesting: (state) => state.actions.likesRequesting,
    }),
    isLiked() {
      const isPreviouslyLiked = !!this.discussionsLiked
        ?.find((like) => like.discussionId === this.discussion.discussionId);
      return this.isTogglingLike ? !isPreviouslyLiked : isPreviouslyLiked;
    },
  },
  methods: {
    ...mapActions(['likeDiscussion', 'unlikeDiscussion']),
    async handleClick() {
      if (!this.currentUser.email) {
        this.$bvModal.show(MODALS.LIKE_AUTH_MODAL);
      } else {
        if (this.isLiked) {
          this.isTogglingLike = true;
          await this.unlikeDiscussion(this.discussion);
        } else {
          this.isTogglingLike = true;
          await this.likeDiscussion(this.discussion);
        }
        this.isTogglingLike = false;
      }
    },

    // Left for future like vs. dislike
    buttonIcon() {
      return this.type === 'like' ? 'hand-thumbs-up' : 'hand-thumbs-down';
    },
  },
};
</script>

<style scoped lang="scss">

.like-button-wrapper {
  margin: auto 0;
}

.red-like-button {
  margin: auto;
  color: red;
}

.black-like-button {
  margin: auto;
  color: black;
}

.like-count {
  padding-left: 5px;
}
</style>
