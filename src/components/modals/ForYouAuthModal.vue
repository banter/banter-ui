<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="My Feed Modal">
      <base-auth-modal
      :modalName="modalName"
      loginHeader="Log In to customize your feed!"
      signUpHeader="Sign up to create your feed">
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>
import MODALS from '../../constants/modals';
import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'ForYouAuthModal',
  data() { return { modalName: MODALS.FOR_YOU_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
};
</script>
