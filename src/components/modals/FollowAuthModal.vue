<template>
  <div>
    <b-modal id="follow-auth-modal" hide-footer hide-header title="Login Modal">
      <base-auth-modal
      loginHeader="Login to Follow"
      signUpHeader="Sign up to Follow">
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>

import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'FollowAuthModal',
  components: {
    BaseAuthModal,
  },
};
</script>
