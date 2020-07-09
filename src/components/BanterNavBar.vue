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
        <ul class="navbar-nav mr-auto">
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <SignUp></SignUp>
        </div>

        <form class="form-inline my-2 my-lg-0">
          <b-input-group id="nav-search-group" size="lg">
            <b-input-group-prepend>
              <b-icon id="nav-search-icon" font-scale="2" icon="search" />
            </b-input-group-prepend>
            <b-form-input list="matched-tags" id="nav-search-input" class="mr-sm-2 shadow-none" type="search"
              autofill="off" autocomplete="off" placeholder="Search"
              @input="(val) => {return val.length > 0 ? queryTopics(val) : clearTopicList()}" v-model="searchText" />
            <ul v-if="matchedTags.length > 0" id="autocomplete-options" class="dropdown-menu">
              <li @click="clearTopicList()" :key="tag.id" v-for="tag in matchedTags">
                <router-link class="dropdown-item" :to="`/topics/${tag.value}`">{{ tag.value }}</router-link>
              </li>
            </ul>
          </b-input-group>
        </form>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SignUp from "../components/SignUp"
export default {
  name: 'BanterNavBar',
  computed: {
    ...mapState({
      matchedTags: state => state.topics.tagMatches,
      isLoading: state => state.topics.isRequestingQuery,
    })
  },
  components: {
    SignUp
  },
  methods: {
    ...mapActions(['queryTopics', 'clearTopicQuery']),
    clearTopicList() {
      this.clearTopicQuery()
      this.searchText = ''
    },
  
  },
  data() {
    return {
      searchText: "",

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
}


#autocomplete-options {
  width: 100%;
  display: block;
}

.autocomplete-option {
  padding-bottom: 1px solid black;
}

.brand-name {
  text-transform: capitalize;
}

.provider-logo {
  width: 20px;
  margin-bottom: 3px;
  margin-right: 5px;
}



</style>