<template>
    <div>
        <b-button v-if="!currentUser.email" v-b-modal.login-modal size="sm" id="nav-signup" type="submit">
            <p id="nav-signup-text">Sign Up</p>
        </b-button>
        <b-nav-item-dropdown v-if="currentUser.email" right>
            <template v-slot:button-content>
                <em>{{currentUser.email}}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item :href="`${API.BASE_URL}${API.USERS}${API.LOGOUT}`">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-modal id="login-modal" hide-footer hide-header title="Login Modal">
            <div class="sign-up-form">
                <div class="sign-up-switch-container">
                    Sign Up
                    <b-form-checkbox v-model="returningUser" class="sign-up-switch" name="check-button" size="lg"
                        switch />
                    Sign In
                </div>
                <h2 class="signin-header">{{returningUser ? 'Sign In' : 'Sign Up'}}</h2>
                <div v-if="!returningUser" class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <b-icon :icon="'person-fill'" /></span>
                    </div>
                    <b-input type="text" v-model="authName" class="form-control" placeholder="name" />
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <b-icon :icon="'envelope-fill'" /></span>
                    </div>
                    <b-input type="email" v-model="authEmail" class="form-control" placeholder="email" />
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <b-icon :icon="'lock-fill'" /></span>
                    </div>
                    <b-input type="password" v-model="authPassword" class="form-control" placeholder="password" />
                </div>
                <div class="input-group form-group">
                    <b-button :disabled="isRequesting" :variant="'primary'" @click="authAction">
                        <div v-if="isRequesting">
                            <LoadingSpinner :variant="'secondary'" />
                        </div>
                        <p v-if="!isRequesting" id="nav-signup-text">{{returningUser ? 'Log In' : 'Sign Up'}}</p>
                    </b-button>
                </div>
                <div v-if="error" class="error-display">
                    <p>{{error}}</p>
                </div>
            </div>
            <div class="social-logins">
                <a v-for="oauthProvider in OAUTH" class="btn btn-outline-dark social-login" role="button"
                    :key="`${oauthProvider.name}-login`"
                    :href="`${API.OAUTH_BASE_URL}/oauth${oauthProvider.name === 'twitter' ? '1' : '2'}/authorization/${oauthProvider.name}?redirect_uri=${API.REDIRECT_URL}`">
                    <img class="provider-logo" alt="Provider sign-in" :src="oauthProvider.logo" />
                    <span>{{returningUser ? 'Log in' : 'Sign up'}} with <span
                            class="brand-name">{{oauthProvider.name}}</span></span>
                </a>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { OAUTH } from '../constants/oauth-providers'
import API from '../constants/api'
import LoadingSpinner from "./LoadingSpinner";
export default {
  name: 'SignUp',
  computed: {
    ...mapState({
      currentUser: state => state.users.currentUser,
      error: state => state.users.error,
      isRequesting: state => state.users.isRequesting
    })
  },
  components: {
    LoadingSpinner, 
  },
  methods: {
    ...mapActions(['loginUser', 'signupUser']),
    clearTopicList() {
      this.clearTopicQuery()
    },
    async authAction() {
      const {authName, authEmail, authPassword} = this;
      this.returningUser 
        ? await this.loginUser({authEmail, authPassword})
        : await this.signupUser({authName, authEmail, authPassword});

      this.closeModal('login-modal')
    },
    closeModal(modal) {
      this.$root.$emit('bv::hide::modal', modal)
    }
  },
  data() {
    return {
      returningUser: true,
      authEmail: '',
      authPassword: '',
      authName: '',
      OAUTH,
      API
    }
  }
}
</script>

<style>
#nav-search-group {
  padding: 0px 6px;
  background: rgba(129, 134, 140, 0.25);
  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

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

.social-logins {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.email-login {
  margin: auto;
}

.social-login {
  margin: 5px;
  max-width: 250px;
}

.brand-name {
  text-transform: capitalize;
}

.provider-logo {
  width: 20px;
  margin-bottom: 3px;
  margin-right: 5px;
}

.sign-up-switch { 
  margin: 0 15px;
}

.sign-up-switch-container {
    display: flex;
    margin: 10px auto;
    justify-content: center;
}

.signin-header {
  text-align: center;
  margin: 30px;
}

</style>