<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="faded">
    <b-navbar-brand>
      <router-link :to="'/'">
        <b-img height="60" :src="require('../assets/logo.png')" alt="Banter Logo"></b-img>
      </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link style="color:black"  to="/genres">All Genres</router-link>
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-nav-form>
            <b-navbar-nav class="align-ml">
              <b-button v-if="!currentUser.email" v-b-modal.login-modal size="sm" id="nav-signup" style="margin-right: 15px" type="submit">
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
                <div class="social-logins">
                  <a v-for="oauthProvider in OAUTH"
                    class="btn btn-outline-dark social-login" role="button"
                    :key="`${oauthProvider.name}-login`"
                    :href="`${API.OAUTH_BASE_URL}/oauth${oauthProvider.name === 'twitter' ? '1' : '2'}/authorization/${oauthProvider.name}?redirect_uri=${API.REDIRECT_URL}`">
                    <img class="provider-logo" alt="Provider sign-in" :src="oauthProvider.logo" />
                    <span>Log in with <span class="brand-name">{{oauthProvider.name}}</span></span>
                  </a>
                </div>
              </b-modal>
            </b-navbar-nav>
            <b-navbar-nav class="nav-search-form" align="center">
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
          </b-nav-form>
        </b-nav-item>
      </b-navbar-nav>    
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { OAUTH } from '../constants/oauth-providers'
import API from '../constants/api'

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
    ...mapActions(['queryTopics', 'clearTopicQuery']),
    clearTopicList() {
      this.clearTopicQuery()
      this.searchText = ''
    }
  },
  data() {
    return {
      searchText: "",
      OAUTH,
      API
    }
  }
}
</script>

<style>

</style>