<template>
  <div>
    <h2 class="signin-header">{{returningUser ? loginHeader : signUpHeader}}</h2>

    <div class="user-auth-switch">
      <p>{{returningUser ? 'Don\'t have an account?' : 'Already have an account?'}}
        <a href="#" class="auth-link" @click="toggleUserReturning">
          {{returningUser ? 'Sign up' : 'Log in'}}
        </a>
      </p>
    </div>
    <div class="social-logins">
      <a v-for="oauthProvider in OAUTH" class="btn btn-outline-dark social-login" role="button"
        :key="`${oauthProvider.name}-login`" :href="`${API.OAUTH_BASE_URL}/oauth${
            oauthProvider.name === 'twitter' ? '1' : '2'
          }/authorization/${oauthProvider.name}?redirect_uri=${windowLocation}`">
        <img class="provider-logo" alt="Provider sign-in" :src="oauthProvider.logo" />
        <span class="login-text">Continue with <span
            class="brand-name">{{oauthProvider.name}}</span></span>
      </a>
      <div class="login-divider">Or</div>
      <a @click="() => showEmailLogin = true"
        class="btn btn-outline-dark social-login use-email-button" role="button">
        <b-icon :icon="'person-fill'" class="use-email-icon" />
        <span class="use-email-text">{{returningUser ? 'Log in' : 'Sign up'}} with Email</span>
      </a>
      <slot name="footer"/>
    </div>
    <b-form @submit="authAction" v-if="showEmailLogin" class="sign-up-form">
      <div v-if="!returningUser" class="input-group form-group">
        <b-input type="text" data-hj-allow v-model="authName" class="form-control auth-form-field"
          placeholder="Name" />
      </div>
      <div class="input-group form-group">
        <b-input type="email" v-model="authEmail" autocomplete="username"
          class="form-control auth-form-field" placeholder="Email" />
      </div>
      <div class="input-group form-group">
        <b-input type="password" :autocomplete="returningUser ? 'current-password' : 'new-password'"
          v-model="authPassword" class="form-control auth-form-field" placeholder="Password" />
      </div>
      <div class="input-group form-group">
        <b-button :disabled="isRequesting || formInvalid" class="auth-button" :variant="'primary'"
          type="submit">
          <div v-if="isRequesting">
            <LoadingSpinner :variant="'secondary'" />
          </div>
          <p v-if="!isRequesting" class="auth-button-text">
            {{returningUser ? 'Log In' : 'Sign Up'}}
          </p>
        </b-button>
      </div>
      <div v-if="error && loginAttempted" class="error-display">
        <p>{{error}}</p>
      </div>
      <!-- Removing so second error message isnt there....not sure if this is needed for certain
      situation -->
      <!-- <div v-if="localError && loginAttempted" class="error-display">
        <p>{{localError}}</p>
      </div> -->
    </b-form>

  </div>
</template>

<script>

import {
  mapActions, mapState, mapMutations, mapGetters,
} from 'vuex';
import OAUTH from '../../constants/oauth-providers';
import MODALS from '../../constants/modals';
import API from '../../constants/api';
import REGEX from '../../constants/regex';
import LoadingSpinner from '../LoadingSpinner.vue';

export default {
  name: 'BaseAuthModal',
  computed: {
    ...mapState({
      error: (state) => state.users.error,
      isRequesting: (state) => state.users.isRequesting,
      returningUser: (state) => state.modals.userHasAccount,
    }),
    formInvalid() {
      if (!this.authPassword || !this.authEmail) return true;
      if (!this.returningUser) {
        if (!this.authName) return true;
      }
      return false;
    },
  },
  props: {
    loginHeader: {
      type: String,
      required: false,
      default: () => 'Log In',
    },
    signUpHeader: {
      type: String,
      required: false,
      default: () => 'Sign Up',
    },
    modalName: {
      type: String,
      required: true,
      default: 'auth-modal',
    },
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    ...mapGetters(['getIfUserShouldOnboard']),
    ...mapActions(['loginUser', 'signupUser']),
    ...mapMutations(['authingUserHasAccount']),
    clearTopicList() {
      this.clearTopicQuery();
    },
    toggleUserReturning() {
      return this.authingUserHasAccount(!this.returningUser);
    },
    async authAction(evt) {
      evt.preventDefault();
      const { authName, authEmail, authPassword } = this;

      if (!REGEX.VALID_EMAIL.test(authEmail)) {
        this.localError = 'Your email appears invalid';
        return;
      }

      this.localError = null;
      this.loginAttempted = true;
      try {
        if (this.returningUser) {
          await this.loginUser({ authEmail, authPassword });
        } else {
          await this.signupUser({ authName, authEmail, authPassword });
        }
        if (this.getIfUserShouldOnboard) {
          this.$bvModal.show(MODALS.BASE_ONBOARDING_MODAL);
        }

        this.closeModal(this.modalName);

        if (this?.currentUser?.email) {
          this.$router.push('/home');
        }
      } catch (error) {
        this.localError = error;
      }
    },
    closeModal(modal) {
      if (this.isRequesting) return;
      Object.assign(this, { authEmail: null, authPassword: null, authName: null });
      this.$root.$emit('bv::hide::modal', modal);
    },
  },
  data() {
    return {
      loginAttempted: false,
      showEmailLogin: false,
      authEmail: '',
      authPassword: '',
      authName: '',
      localError: null,
      OAUTH,
      windowLocation: window.location.href,
      API,
    };
  },
};
</script>

<style scoped lang="scss">
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

.brand-name {
  text-transform: capitalize;
}

.provider-logo {
  width: 20px;
  margin-bottom: 3px;
  margin-right: 5px;
  height: 20px;
  width: 20px;
}

.signin-header {
  text-align: center;
  margin: 30px;
}

.sign-up-form {
  margin-top: 25px;
}

span.login-text {
    margin: 0px 40px;
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
