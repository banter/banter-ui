<template>
<div>
        <router-link v-if="this.currentUser.email" :to="'/home'"
        class="navbar-brand d-flex m-auto">
          <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
          My Feed
        </router-link>
        <div v-else @click="handleClick" class="navbar-brand d-flex m-auto">
          <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
          My Feed
        </div>
        <my-feed-auth-modal refs="myFeedModal"></my-feed-auth-modal>
        </div>
</template>

<script>
import { mapState } from 'vuex';
import MyFeedAuthModal from '../modals/MyFeedAuthModal.vue';

export default {
  name: 'MyFeedButton',
  components: {
    MyFeedAuthModal,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  methods: {
    handleClick() {
      this.$bvModal.show(this.$refs.myFeedModal.modalName);
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-brand{
    flex-direction:column
}
</style>
