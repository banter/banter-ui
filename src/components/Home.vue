<template>
  <div class="main-content">
    <h1>{{ msg }}</h1>
    <b-list-group class="topics-list">
      <b-list-group-item href="#" v-for="topic in topics" :key="topic.id">
        {{ topic.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  props: {
    msg: String,
    info: Array
  },
  methods: {
    ...mapActions(['fetchTopics'])
  },
  computed: {
    ...mapGetters({topics: 'getTopics'})
  }, 
  created () {
    this.fetchTopics();
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
