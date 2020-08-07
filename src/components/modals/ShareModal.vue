<template>
  <div>
      <b-modal :id="modalName" hide-footer hide-header title="Share Modal">
    <h2 class="signin-header">Share</h2>
    <div class="social-logins">
      <ShareNetwork
    v-for="network in NETWORKS"
    :network="network.network"
    :key="network.network"
    :url="sharing.url"
    :title="sharing.title"
    :description="sharing.description"
    :quote="sharing.quote"
    :hashtags="sharing.hashtags"
    :twitterUser="sharing.twitterUser"
  >
        <a class="btn btn-outline-dark social-login" role="button">
        <img class="provider-logo" alt="Provider sign-in" :src="network.logo" />
        <span class="brand-name">{{network.network}}</span>
      </a>
  </ShareNetwork>
    </div>
      </b-modal>

  </div>
</template>

<script>

import SOCIALMEDIA from '../../constants/banter-social-media-accounts';
import NETWORKS from '../../constants/banter-networks';

export default {
  name: 'ShareModal',
  components: {
  },
  data() {
    return {
      returningUser: true,
      SOCIALMEDIA,
      NETWORKS,
      modalName: 'share-modal',
      sharing: {
        url: 'https://banteraudio.com/share',
        title: 'Say Hi to the New Way to listen to Podcasts. Go checkout Banter!',
        description: 'Say Hi to the New Way to listen Podcasts. Go checkout Banter!',
        quote: 'This has changed how I will listen to podcasts forever.',
        hashtags: 'banter,theNewNormal,podcasts',
        twitterUser: 'banteraudio',
      },

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
