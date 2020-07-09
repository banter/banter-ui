<template>
  <div class="main-content">
    <!-- Waiting to Display Topic Hero until content is loaded
    this is done because the cards use the request data to render, if
    html is loaded before the trending topics are in, gets screwed -->
    <div v-if="!isRequestingTrending">
      <TopicHero v-if="!isRequestingTrending && getTrendingTopicTags.length > 0" :topics="getTrendingTopicTags"/>
    </div>
    <div v-for="(collection, index) in collections" :key="`carousel-${index}`">
      <NewTopicCarouselScroll :collection="collection"/>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapState } from 'vuex'
import TopicHero from "../../containers/TopicHero"
import NewTopicCarouselScroll from "../../containers/NewTopicCarouselScroll"

export default {
  name: 'Home',
  components: {
    TopicHero,
    NewTopicCarouselScroll
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
      isRequestingTrending: state => state.topics.isRequesting,
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
  width: 95%;
  margin: auto;
}
.topics-list {
  margin-top: 50px;
}
</style>
