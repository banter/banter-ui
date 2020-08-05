<template>
  <div>
    <div v-if="isMobile">
      <router-link v-if="this.currentUser.email" :to="'/foryou'" class="navbar-brand d-flex m-auto">
        <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
        For You
      </router-link>
      <div v-else @click="handleClick" class="navbar-brand d-flex m-auto">
        <b-icon icon="collection" font-scale="1.2" style="margin:auto"> </b-icon>
        For You
      </div>
    </div>
    <div v-else>
      <router-link v-if="this.currentUser.email" :to="'/foryou'" class="navbar-brand d-flex m-auto">
        <b-button size="sm" type="submit" id="nav-signup">
          <p id="nav-signup-text">For You</p>
        </b-button>
      </router-link>
      <div v-else @click="handleClick" class="navbar-brand d-flex m-auto">
        <b-button size="sm" type="submit" id="nav-signup">
          <p id="nav-signup-text">For You</p>
        </b-button>
      </div>
    </div>
    <my-feed-auth-modal ref="myFeedAuthModal"></my-feed-auth-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MyFeedAuthModal from '../modals/MyFeedAuthModal.vue';

export default {
  name: 'ForYouButton',
  components: {
    MyFeedAuthModal,
  },
  props: {
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  methods: {
    handleClick() {
      this.$bvModal.show(this.$refs.myFeedAuthModal.modalName);
    },
  },
};
</script>

<style scoped lang="scss">

#nav-signup {
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right:5px;
  background: none;
  color: black;
}
#nav-signup:hover {
  color: white;
  background: black;
}

#nav-signup-text {
  height: 25px;
  left: 17px;
  right: 15.9px;
  top: calc(50% - 25px/2 + 0.31px);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;

  display: flex;
  align-items: center;
  text-align: center;
  margin: 7px 20px;
}
.navbar-brand{
    flex-direction:column
}
</style>
