<template>
  <div>
    <b-button
      v-if="!currentUser.email && !isRequesting"
      @click="showAuthModal"
      size="sm"
      id="nav-signup"
      type="submit"
      :class="hideBorders ? 'no-borders' : ''"
    >
      <p id="nav-signup-text">{{returningUser ? 'Log In' : 'Sign Up'}}</p>
    </b-button>
    <b-nav>
      <b-nav-item-dropdown v-if="currentUser.email">
        <template slot="button-content">
          <b-avatar />
        </template>
        <b-dropdown-item disabled href="#">{{currentUser.email}}</b-dropdown-item>
        <b-dropdown-item
          class="mobile-dropdown"
          @click="clearAuthToken"
          :href="`${API.BASE_URL}${API.USERS}${API.LOGOUT}`"
        >Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import API from '../constants/api';
import MODALS from '../constants/modals';
import AUTH from '../constants/auth';

export default {
  name: 'AuthModalButton',
  props: {
    returningUser: {
      type: Boolean,
      required: false,
      default: true,
    },
    hideBorders: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      isRequesting: (state) => state.users.isRequesting,
    }),
  },
  methods: {
    ...mapMutations(['authingUserHasAccount']),
    showAuthModal() {
      this.authingUserHasAccount(this.returningUser);
      this.$bvModal.show(MODALS.AUTH_MODAL);
    },
    clearAuthToken() {
      window.localStorage.setItem(AUTH.BANTER_ACCESS_TOKEN, null);
    },
  },
  data() {
    return { API };
  },
};
</script>

<style scoped lang="scss">
@media (max-width: 800px) {
  .dropdown-menu.show {
    left: -170px;
  }
}

#nav-search-group {
  padding: 0px 6px;
  background: rgba(129, 134, 140, 0.25);
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

// this changes all buttons in Repo with this id
#nav-signup.no-borders{
  border: none;

  &:hover {
      color: black;
      background: initial;
      #nav-signup-text {
        font-weight: bold;
      }
  }
}

#nav-signup {
  padding: 0 0;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  margin-right: 5px;
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
  top: calc(50% - 25px / 2 + 0.31px);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;

  display: flex;
  align-items: center;
  text-align: center;
  margin: 7px 20px;
}

</style>
