<template>
  <div class="main-content">
    <TopicHero :topics="getTrendingTopicTags"/>

    <div class="carousel-container" v-for="(collection, index) in collections" :key="`carousel-${index}`">
      <TopicCarouselScroll :collection="collection"/>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapState } from 'vuex'
import TopicHero from "../../containers/TopicHero"
import TopicCarouselScroll from "../../containers/TopicCarouselScroll"

export default {
  name: 'Home',
  components: {
    TopicHero,
    TopicCarouselScroll
  },
  props: {
    loginSuccess: {
      type: Boolean,
      required: false,
      default: false
    },
    loginError: {
      type: String,
      required: false,
      default: ''
    },
  },
  mounted() {
    if (this.loginError) {
      this.$bvToast.toast(this.loginError, {
        title: 'Login Error',
        variant: 'warning',
        autoHideDelay: 5000
      })
    }
  },
  computed: {
    ...mapGetters(["getTrendingTopicTags"]),
    ...mapState({
      collections: state => state.topics.collections
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
}
.topics-list {
  margin-top: 50px;
}
</style>
