<template>
  <div class="main-content">
      <SearchBar></SearchBar>
      <follow-cards v-bind:isSuggestions="true"/>/>
  </div>

</template>

<script>

import SearchBar from '../../components/commons/SearchBar.vue';
import FollowCards from '../../components/FollowCards.vue';

export default {
  name: 'Explore',
  components: {
    SearchBar,
    FollowCards,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main-content {
  width: 95%;
  margin: auto;
}
.topics-list {
  margin-top: 50px;
}
</style>
