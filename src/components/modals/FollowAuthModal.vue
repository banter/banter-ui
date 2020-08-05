<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Follow Modal">
      <base-auth-modal
      :modalName="modalName"
      loginHeader="Login to Follow"
      signUpHeader="Sign up to Follow">
        <template slot="footer">
          <a href="#" class="auth-link" @click="$bvModal.hide(modalName)">Continue as Guest</a>
        </template>
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>
import MODALS from '../../constants/modals';
import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'FollowAuthModal',
  data() { return { modalName: MODALS.FOLLOW_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
};
</script>
