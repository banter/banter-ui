<template>
  <div>
    <b-modal id="my-feed-auth-modal" hide-footer hide-header title="My Feed Modal">
      <base-auth-modal
      loginHeader="Login to see your Feed"
      signUpHeader="Sign up to create your Feed">
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>

import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'MyFeedAuthModal',
  components: {
    BaseAuthModal,
  },
};
</script>
