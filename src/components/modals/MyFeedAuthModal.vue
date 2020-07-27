<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="My Feed Modal">
      <base-auth-modal
      :modalName="modalName"
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
  data() { return { modalName: 'my-feed-auth-modal' }; },
  components: {
    BaseAuthModal,
  },
};
</script>
