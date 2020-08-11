<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Passive Auth Modal">
      <base-auth-modal
      :modalName="modalName"
       loginHeader="Log In"
      signUpHeader="Enjoying Banter? Sign up!">
                    <template slot="footer">
          <a href="#" class="auth-link" @click="$bvModal.hide(modalName)">Continue as Guest</a>
        </template>
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MODALS from '../../constants/modals';
import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'PassiveAuthModal',
  data() { return { modalName: MODALS.PASSIVE_AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  mounted() {
    setTimeout(() => {
      if (!this.currentUser.email) { this.$bvModal.show(MODALS.PASSIVE_AUTH_MODAL); }
    }, 100000);
  },
};
</script>
