<template>
  <div>
        <b-form class="form-inline my-2 my-lg-0">
          <b-input-group id="nav-search-group" size="lg">
            <b-input-group-prepend>
              <b-icon id="nav-search-icon" font-scale="2" icon="search" />
            </b-input-group-prepend>
            <v-select
              @search="searchItems"
              @input="selectItem"
              class="search-select"
              :filterable="false"
              :options="foundTags"
              placeholder="Search">
              <template #open-indicator="{ attributes }">
                <span v-bind="attributes"></span>
              </template>
              <template #no-options="{ search }">
                {{search.length === 0 ? "Enter a search term" : "No results found."}}
              </template>
            </v-select>
          </b-input-group>
        </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
import topicUrlGenerator from '../../store/helpers/topic-url-generator';

export default {
  name: 'SearchBar',
  watch: {
    matchedTags(newVal) {
      this.foundTags = newVal.map((tag) => ({ label: tag.value, id: tag.id })) || [];
      this.loadingSpinner(false);
    },
  },
  computed: {
    ...mapState({
      matchedTags: (state) => state.topics.tagMatches,
      isLoading: (state) => state.topics.isRequestingQuery,
    }),
  },
  methods: {
    ...mapActions(['queryTopics', 'clearTopicQuery']),
    clearTopicList() {
      this.clearTopicQuery();
      this.searchText = '';
    },
    searchItems(search, loading) {
      this.loadingSpinner = loading;
      this.loadingSpinner(true);
      this.updateAutocomplete(search, loading, this);
    },
    updateAutocomplete: _.debounce(async (search, loading, vm) => {
      if (search.length > 0) {
        await vm.queryTopics(search);
      } else {
        vm.clearTopicList();
        vm.loadingSpinner(false);
      }
    }, 100),
    selectItem(tag) {
      this.$router.push(topicUrlGenerator(tag, true));
    },
  },
  data() {
    return {
      searchText: '',
      foundTags: [],
      loadingSpinner: () => {},
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

  .vs__dropdown-menu {
    font-size: initial;
    font-weight: initial;
    color: initial;
  }
  .vs__dropdown-option--highlight {
    background: #f8f9fa;
    color: initial;
  }

}
</style>
