<template>
  <div class="feedback-location">
      <font-awesome-icon
       @click="handleClick" icon="comment-dots" size="2x" color="#1da1f2" />
  </div>
</template>

<script>

import MODALS from '../../constants/modals';

export default {
  name: 'FeedbackButton',
  methods: {
    handleClick() {
      this.$bvModal.show(MODALS.FEEDBACK_MODAL);
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback-location {
    position: relative;
    left: 90%;
    margin-bottom: 10px;
}
</style>
