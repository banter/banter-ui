<template>
  <div class="landing-home">
    <b-navbar toggleable="sm">
      <b-navbar-brand>
        <router-link :to="'/'">
          <b-img height="60" :src="require('../../assets/Banter_logo_dark.png')" alt="Banter Logo">
          </b-img>
        </router-link>
      </b-navbar-brand>
      <ul class="navbar-nav mr-auto">
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <AuthModalButton></AuthModalButton>
      </div>
    </b-navbar>

    <div class="landing-content">
      <h1 class="marketing-message"> The New Way to Listen to Sports Talk</h1>
      <router-link class="landing-image" to="/home">
        <b-button size="sm" id="nav-signup" type="submit" style="margin:auto">
          <p id="nav-signup-text">Explore</p>
        </b-button>
      </router-link>
      <b-img fluid class="landing-image" :src="require('../../assets/radio.png')" alt="Radio" />
    </div>
    <ContactUsForm/>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import AuthModalButton from '../../components/AuthModalButton.vue';
import ContactUsForm from '../../components/ContactUsForm.vue';

export default {
  name: 'Landing',
  components: {
    AuthModalButton,
    ContactUsForm,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.users.currentUser,
    }),
  },
  async mounted() {
    await this.$store.dispatch('fetchCurrentUser');
    if (this?.currentUser?.email) {
      this.$router.push('/home');
    }
  },
};
</script>

<style scoped>
.landing-home {
  background-color: #F8ECDC;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}

.landing-content {
  padding-top: 100px;
}
.marketing-message {
  text-align: center;
}
.landing-image {
  margin: auto;
  display: flex;
}
</style>
