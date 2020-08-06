<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Like Modal">
      <base-auth-modal
      :modalName="modalName"
      loginHeader="Login to Like"
      signUpHeader="Sign up to Like">
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
  name: 'LikeAuthModal',
  data() { return { modalName: MODALS.LIKE_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
};
</script>
