<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Login Modal">
      <base-auth-modal :modalName="modalName">
      </base-auth-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MODALS from '../../constants/modals';
import BaseAuthModal from './BaseAuthModal.vue';

export default {
  name: 'AuthModal',
  data() { return { modalName: MODALS.AUTH_MODAL }; },
  components: {
    BaseAuthModal,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
};
</script>
