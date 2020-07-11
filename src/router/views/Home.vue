<template>
  <div class="main-content">
    <TopicHero
      v-if="!isRequestingTrending && getTrendingTopicTags.length > 0"
      :topics="getTrendingTopicTags" :heroSize="heroSize"/>
    <div v-for="(collection, index) in collections" :key="`carousel-${index}`">
      <TopicCarouselScroll :collection="collection" :isMobile="isMobile"/>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex';
import TopicHero from '../../containers/TopicHero.vue';
import TopicCarouselScroll from '../../containers/TopicCarouselScroll.vue';

export default {
  name: 'Home',
  components: {
    TopicHero,
    TopicCarouselScroll,
  },
  props: {
    loginSuccess: {
      type: Boolean,
      required: false,
      default: false,
    },
    loginError: {
      type: String,
      required: false,
      default: '',
    },
  },
  mounted() {
    if (this.loginError) {
      this.$bvToast.toast(this.loginError, {
        title: 'Login Error',
        variant: 'warning',
        autoHideDelay: 5000,
      });
    }
    window.addEventListener('resize', this.resizeWindow);
    this.resizeWindow();
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeWindow);
  },
  methods: {
    ...mapActions(['resizeWindow']),
  },
  computed: {
    ...mapGetters(['getTrendingTopicTags']),
    ...mapState({
      isRequestingTrending: (state) => state.topics.isRequesting,
      collections: (state) => state.topics.collections,
      heroSize: (state) => state.sizing.heroSize,
      isMobile: (state) => state.sizing.isMobile,
    }),
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
