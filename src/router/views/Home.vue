<template>
  <div class="main-content">
    <TopicHero :topics="getTrendingTopicTags"/>
    <TopicCarouselScroll/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopicHero from "../../containers/TopicHero"
import TopicCarouselScroll from "../../containers/TopicCarouselScroll"

export default {
  name: 'Home',
  components: {
    TopicHero,
    TopicCarouselScroll
  },
  computed: {
    ...mapGetters(["getTrendingTopicTags"])
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
}
.topics-list {
  margin-top: 50px;
}
</style>
