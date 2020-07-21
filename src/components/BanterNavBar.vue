<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="faded">
      <b-navbar-brand>
        <router-link :to="'/home'">
          <b-img height="60" :src="require('../assets/Banter_logo_dark.png')"
          alt="Banter Logo"></b-img>
        </router-link>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <ul class="navbar-nav mr-auto">
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <AuthModalButton></AuthModalButton>
        </div>

        <b-form class="form-inline my-2 my-lg-0">
          <b-input-group id="nav-search-group" size="lg">
            <b-input-group-prepend>
              <b-icon id="nav-search-icon" font-scale="2" icon="search" />
            </b-input-group-prepend>
            <v-select
              @search="(val) => {return val.length > 0 ? queryTopics(val) : clearTopicList()}"
              @input="selectItem"
              class="search-select"
              :options="matchedTags.map(tag => ({label: tag.value})) || []"
              placeholder="Search">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes"></span>
              </template>
            </v-select>
          </b-input-group>
        </b-form>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AuthModalButton from './AuthModalButton.vue';

export default {
  name: 'BanterNavBar',
  computed: {
    ...mapState({
      matchedTags: (state) => state.topics.tagMatches,
      isLoading: (state) => state.topics.isRequestingQuery,
    }),
  },
  components: {
    AuthModalButton,
  },
  methods: {
    ...mapActions(['queryTopics', 'clearTopicQuery']),
    clearTopicList() {
      this.clearTopicQuery();
      this.searchText = '';
    },
    selectItem(tag) {
      this.$router.push(`/topics/${tag.label}`);
    },
  },
  data() {
    return {
      searchText: '',

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

.search-select {
  height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  min-width: 250px;

  .vs__search {
    color: grey;
  }
  .vs__dropdown-toggle {
    border: none;
  }

  .vs__actions {
    display: flex;
    align-items: center;
  }
}
</style>
