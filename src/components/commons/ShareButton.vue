<template>
  <div class="share-button-wrapper">
    <div @click="handleClick" class="navbar-brand d-flex m-auto">
      <i class="fas fa-share-alt fa"></i>
    </div>
  </div>
</template>

<script>

import MODALS from '../../constants/modals';

export default {
  name: 'ShareButton',
  methods: {
    handleClick() {
      this.$bvModal.show(MODALS.SHARE_MODAL);
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
