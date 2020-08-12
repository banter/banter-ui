<template>
  <div class="feedback-location">
      <font-awesome-icon
           @click="handleClick"
        icon="comment-dots"
        size="2x"
        color="#1da1f2"
        class="feedback-icon"/>
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
    margin-bottom: 10px
}

@media (min-width: 800px) {
    .feedback-location {
            position: relative;
    left: 95%;
    margin-bottom: 10px;
    }
};

.feedback-icon {
  cursor: pointer;
}

</style>
