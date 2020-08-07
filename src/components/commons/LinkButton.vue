<template>
  <div>
    <div>
      <router-link :to="'/for-you'" class="navbar-brand d-flex m-auto">
        <div v-if="isMobile" @click="!this.currentUser.email" class="navbar-brand d-flex m-auto">
          <b-icon icon="collection" font-scale="1.2" style="margin:auto"/>
          {{streamLinkText}}
        </div>
        <div v-else @click="triggerAuthModal" class="navbar-brand d-flex m-auto">
          <b-button size="sm" type="submit" id="nav-signup">
            <p id="nav-signup-text">{{streamLinkText}}</p>
          </b-button>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MODALS from '../../constants/modals';

export default {
  name: 'LinkButton',
  components: {
  },
  props: {
    isMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
    streamLinkText: {
      type: String,
      required: false,
      default: 'For You',
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  methods: {
    triggerAuthModal() {
      this.$bvModal.show(MODALS.FOR_YOU_AUTH_MODAL);
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
