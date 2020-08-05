<template>
  <div class="like-button-wrapper">
    <div :aria-disabled="likesRequesting" @click="handleClick" class="navbar-brand d-flex m-auto">
        <div v-if="likesRequesting">
        <LoadingSpinner :variant="'secondary'" />
      </div>
      <b-icon v-else :icon="isLiked ? 'heart-fill':'heart'"
      font-scale="1.2" :class="isLiked ? 'red-like-button':'black-like-button'"></b-icon>
        <!-- {{isLiked ? 'Unlike' : 'Like'}} -->
    </div>
    <like-auth-modal ref="likeAuthModal"></like-auth-modal>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LikeAuthModal from '../modals/LikeAuthModal.vue';
import LoadingSpinner from '../LoadingSpinner.vue';

export default {
  name: 'LikeButton',
  components: {
    LikeAuthModal,
    LoadingSpinner,
  },
  props: {
    type: {
      type: String,
      required: false,
      default: 'hand-thumbs-up',
    },
    discussion: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      discussionsLiked: (state) => state.actions.discussionsLiked,
      likesRequesting: (state) => state.actions.likesRequesting,
    }),
    isLiked() {
      // eslint-disable-next-line max-len
      return !!this.discussionsLiked?.find((like) => like.discussionId === this.discussion.discussionId);
    },
  },
  methods: {
    ...mapActions(['likeDiscussion', 'unlikeDiscussion']),
    async handleClick() {
      if (!this.currentUser.email) {
        this.$bvModal.show(this.$refs.likeAuthModal.modalName);
      } else {
        if (this.isLiked) {
          await this.unlikeDiscussion(this.discussion);
        } else {
          await this.likeDiscussion(this.discussion);
        }
        this.$store.dispatch('fetchDiscussionsLiked');
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

.like-button-wrapper{
  margin:auto;
}

.red-like-button {
margin: auto;
color: red;
}
.black-like-button {
margin: auto;
color: black;
}

.navbar-brand{
    flex-direction:column
}
</style>
