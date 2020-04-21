<template>
  <div class="main-content">
    <b-list-group class="topics-list">
        <router-link v-for="topic in topics" :key="topic.id" :to="`/topics/${topic.id}`">
          <b-list-group-item>{{ topic.name }}</b-list-group-item>
        </router-link>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({topics: 'getTopics'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  margin: auto;
  width: 600px;
  margin-top: 50px;
}
.topics-list {
  margin-top: 50px;
}
</style>
