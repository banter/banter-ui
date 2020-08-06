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
import MODALS from '../../constants/modals';
import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'MyFeedAuthModal',
  data() { return { modalName: MODALS.MY_FEED_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
};
</script>
