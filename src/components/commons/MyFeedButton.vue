<template>
  <div>
    <router-link v-if="this.currentUser.email" :to="'/home'" class="navbar-brand d-flex m-auto">
      <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
      My Feed
    </router-link>
    <div v-else @click="handleClick" class="navbar-brand d-flex m-auto">
      <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
      My Feed
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MODALS from '../../constants/modals';

export default {
  name: 'MyFeedButton',
  components: {
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  methods: {
    handleClick() {
      this.$bvModal.show(MODALS.MY_FEED_AUTH_MODAL);
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-brand{
    flex-direction:column
}
</style>
