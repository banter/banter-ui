<template>
  <b-navbar>
    <b-navbar-brand>
      <router-link :to="'/'">
        <b-img height="60" :src="require('../assets/logo.png')" alt="Banter Logo"></b-img>
      </router-link>
    </b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item>
        <router-link class="dropdown-item" to="/genres">All Genres</router-link>
      </b-nav-item>
    </b-navbar-nav>
    
    <b-navbar-nav :style="{margin: 'auto'}" class="nav-search-form" align="center">
      <b-nav-form>
        <b-input-group id="nav-search-group" size="lg">
          <b-input-group-prepend>
            <b-icon id="nav-search-icon" font-scale="2" icon="search" />
          </b-input-group-prepend>
          <b-form-input 
            list="matched-tags"
            id="nav-search-input"
            class="mr-sm-2 shadow-none"
            type="search"
            autofill="off"
            autocomplete="off"
            placeholder="Search"
            @input="(val) => {return val.length > 0 ? queryTopics(val) : clearTopicList()}"
            v-model="searchText"/>
            <!-- TODO: Add keyboard actions -->
          <ul v-if="matchedTags.length > 0" id="autocomplete-options" class="dropdown-menu">
            <li @click="clearTopicList()" :key="tag.id" v-for="tag in matchedTags">
              <router-link class="dropdown-item" :to="`/topics/${tag.value}`">{{ tag.value }}</router-link>
            </li>
          </ul>
        </b-input-group>
      </b-nav-form>
    </b-navbar-nav>
    <b-navbar-nav class="align-ml">
      <b-button v-if="!currentUser.email" v-b-modal.modal-1 size="sm" id="nav-signup" type="submit">
        <p id="nav-signup-text">Sign Up</p>
      </b-button>

      <b-nav-item-dropdown v-if="currentUser.email" right>
        <!-- Using 'button-content' slot -->
        <template v-slot:button-content>
          <em>{{currentUser.email}}</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="clearUser">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-modal id="modal-1" hide-footer hide-header title="BootstrapVue">
        <div class="social-logins">
          <a 
            v-for="oauthProvider in OAUTH"
            class="btn btn-outline-dark social-login" role="button" style="text-transform:none"
            :key="`${oauthProvider.name}-login`"
            :href="`http://localhost:8080/oauth${oauthProvider.name === 'twitter' ? '1' : '2'}/authorization/${oauthProvider.name}?redirect_uri=http://localhost:8081`">
            <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" :src="oauthProvider.logo" />
            <span>Log in with <span class="brand-name">{{oauthProvider.name}}</span></span>
          </a>
        </div>
      </b-modal>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { OAUTH } from '../constants/OAuth'

export default {
  name: 'BanterNavBar',
  computed: {
    ...mapState({
      matchedTags: state => state.topics.tagMatches,
      isLoading: state => state.topics.isRequestingQuery,
      currentUser: state => state.users.currentUser
    })
  },
  methods: {
    ...mapActions(['queryTopics', 'clearTopicQuery', 'clearUser']),
    clearTopicList() {
      this.clearTopicQuery()
      this.searchText = ''
    }
  },
  data() {
    return {
      searchText: "",
      OAUTH
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

#nav-search-group:focus {
  box-shadow: inset 0 -2px 0 #2196F3
}

#nav-search-icon {
  margin: auto;
  opacity: .4;
}

#nav-search-input {
  border: 0;
  background: none;
  width: 525px;
}

@media only screen and (max-width: 1200px) {
  #nav-search-input {
    width: 325px;
  }
}

#nav-signup {
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
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

#autocomplete-options {
  width: 100%;
  display: block;
}

.autocomplete-option {
  padding-bottom: 1px solid black;
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

</style>