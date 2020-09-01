<template>
  <div class="share-button-wrapper">
    <div @click="handleClick" class="navbar-brand d-flex m-auto">
      <font-awesome-icon icon="share-alt" />
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import MODALS from '../../constants/modals';

export default {
  name: 'ShareButton',
  methods: {
    ...mapMutations(['setShareDiscussionId']),

    handleClick() {
      if (this.isDiscussionCard) { this.setShareDiscussionId(this.discussionId); }
      this.$bvModal.show(MODALS.SHARE_MODAL);
    },
  },
  props: {
    isDiscussionCard: {
      type: Boolean,
      required: false,
      default: false,
    },
    discussionId: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.share-button-wrapper {
  margin: auto 0;
  padding-right: 15px;
}

</style>
