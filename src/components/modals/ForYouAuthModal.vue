<template>
  <div>
    <b-modal :id="modalName" hide-header hide-footer>
      <base-auth-modal
      :modalName="modalName"
      loginHeader="Log In to customize your feed!"
      signUpHeader="Sign up to create your feed!">
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
  name: 'ForYouAuthModal',
  data() { return { modalName: MODALS.FOR_YOU_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
};
</script>

<style scoped lang="scss">
#modalName {
  .modal-header {
    border-bottom: none;
  }
}
</style>
