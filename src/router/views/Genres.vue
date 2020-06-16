<template>
  <div class="main-content">
      <b-list-group class="topics-list">
        <b-list-group-item v-for="topic in topics" :key="topic.id">
          <router-link :key="`topic-${topic.name}`" :to="`/topics/${topic.name}`">{{ topic.name }}</router-link>
        </b-list-group-item>
      </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
    computed: {
    ...mapState({
      topics: state => state.topics.topics
    }),
  }
}
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
  margin: auto;
  width: 600px;
  margin-top: 50px;
}
.topics-list {
  margin-top: 50px;
}
</style>
