<template>
  <div>
    <b-button v-if="!currentUser.email" v-b-modal.login-modal size="sm" id="nav-signup"
      type="submit">
      <p id="nav-signup-text">Sign Up</p>
    </b-button>
    <b-nav-item-dropdown v-if="currentUser.email" right>
      <template v-slot:button-content>
        <em>{{currentUser.email}}</em>
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item :href="`${API.BASE_URL}${API.USERS}${API.LOGOUT}`">
        Sign Out
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <b-modal id="login-modal" hide-footer hide-header title="Login Modal">
      <h2 class="signin-header">{{returningUser ? 'Welcome Back' : 'Welcome to Banter'}}</h2>
      <div class="user-auth-switch">
        <p v-if="returningUser">Don't have an account?
          <a
            href="#"
            class="auth-link"
            @click="() => returningUser = false">Sign Up
          </a>
        </p>
        <p v-if="!returningUser">Already have an account?
          <a
            href="#"
            class="auth-link"
            @click="() => returningUser = true">Sign In
          </a>
        </p>
      </div>
      <div class="social-logins">
        <a v-for="oauthProvider in OAUTH" class="btn btn-outline-dark social-login" role="button"
          :key="`${oauthProvider.name}-login`"
          :href="`${API.OAUTH_BASE_URL}/oauth${
            oauthProvider.name === 'twitter' ? '1' : '2'
          }/authorization/${oauthProvider.name}?redirect_uri=${API.REDIRECT_URL}`">
          <img class="provider-logo" alt="Provider sign-in" :src="oauthProvider.logo" />
          <span class="login-text">{{returningUser ? 'Log in' : 'Sign up'}} with <span
              class="brand-name">{{oauthProvider.name}}</span></span>
        </a>
        <div class="login-divider">Or</div>
        <a
          @click="() => showEmailLogin = true"
          class="btn btn-outline-dark social-login use-email-button"
          role="button">
          <b-icon :icon="'person-fill'" class="use-email-icon"/>
          <span class="use-email-text">Use Email</span>
        </a>
      </div>
      <div v-if="showEmailLogin" class="sign-up-form">
        <div v-if="!returningUser" class="input-group form-group">
          <b-input
            type="text"
            v-model="authName"
            class="form-control auth-form-field"
            placeholder="Name" />
        </div>
        <div class="input-group form-group">
          <b-input
            type="email"
            v-model="authEmail"
            class="form-control auth-form-field"
            placeholder="Email" />
        </div>
        <div class="input-group form-group">
          <b-input
            type="password"
            v-model="authPassword"
            class="form-control auth-form-field"
            placeholder="Password" />
        </div>
        <div class="input-group form-group">
          <b-button
            :disabled="isRequesting || formInvalid"
            class="auth-button"
            :variant="'primary'"
            @click="authAction">
            <div v-if="isRequesting">
              <LoadingSpinner :variant="'secondary'" />
            </div>
            <p v-if="!isRequesting" class="auth-button-text">
              {{returningUser ? 'Log In' : 'Sign Up'}}
            </p>
          </b-button>
        </div>
        <div v-if="error" class="error-display">
          <p>{{error}}</p>
        </div>
        <div v-if="localError" class="error-display">
          <p>{{localError}}</p>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OAUTH from '../constants/oauth-providers';
import API from '../constants/api';
import REGEX from '../constants/regex';
import LoadingSpinner from './LoadingSpinner.vue';

export default {
  name: 'SignUp',
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
      error: (state) => state.users.error,
      isRequesting: (state) => state.users.isRequesting,
    }),
    formInvalid() {
      if (!this.authPassword || !this.authEmail) return true;
      if (!this.returningUser) {
        if (!this.authName) return true;
      }
      return false;
    },
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    ...mapActions(['loginUser', 'signupUser']),
    clearTopicList() {
      this.clearTopicQuery();
    },
    async authAction() {
      const { authName, authEmail, authPassword } = this;

      if (!REGEX.VALID_EMAIL.test(authEmail)) {
        this.localError = 'Your email appears invalid';
        return;
      }

      this.localError = null;
      await (this.returningUser
        ? this.loginUser({ authEmail, authPassword })
        : this.signupUser({ authName, authEmail, authPassword }));

      this.closeModal('login-modal');
    },
    closeModal(modal) {
      this.$root.$emit('bv::hide::modal', modal);
    },
  },
  data() {
    return {
      returningUser: true,
      showEmailLogin: false,
      authEmail: '',
      authPassword: '',
      authName: '',
      localError: null,
      OAUTH,
      API,
    };
  },
};
</script>

<style lang="scss">
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
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.brand-name {
  text-transform: capitalize;
}

.provider-logo {
  width: 20px;
  margin-bottom: 3px;
  margin-right: 5px;
}

.signin-header {
  text-align: center;
  margin: 30px;
}

.sign-up-form {
  margin-top: 25px;
}

span.login-text {
    margin: 0px 50px;
}

.use-email-button {
  .use-email-icon {
    margin-left: 7px;
    float: left;
    margin-top: 3px;
  }
  &:hover {
    .use-email-icon {
      color: white;
    }
  }

  &:hover {
    .use-email-text {
      color: white;
    }
  }

  .use-email-text {
    margin: auto;
  }
}

a.auth-link:hover {
  color: #00a8ff;
  text-decoration: none;
}

.user-auth-switch {
    text-align: center;
}

.login-divider {
  padding: 10px 0;
  font-weight: bolder;
}

.auth-button {
margin: auto;
width: 35%;
min-width: 150px;

  .auth-button-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    margin: auto;
  }
}

.error-display {
  text-align: center;
  font-weight: bold;
}

</style>
