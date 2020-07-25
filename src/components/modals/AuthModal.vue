<template>
  <div>
    <b-modal id="auth-modal" hide-footer hide-header title="Login Modal">
      <base-auth-modal>
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>

import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'AuthModal',

  components: {
    BaseAuthModal,
  },
};
</script>
