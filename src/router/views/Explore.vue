<template>
  <div class="main-content">
      <SearchBar></SearchBar>
  </div>

</template>

<script>

import SearchBar from '../../components/commons/SearchBar.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
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
