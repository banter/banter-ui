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

import { mapGetters, mapState } from 'vuex';
import TopicHero from '../../containers/TopicHero.vue';
import TopicCarouselScroll from '../../containers/TopicCarouselScroll.vue';

export default {
  name: 'Home',
  components: {
    TopicHero,
    TopicCarouselScroll,
  },
  data() {
    return {
      heroSize: 300,
      isMobile: false,
    };
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
    window.addEventListener('resize', this.myEventHandler);
    this.myEventHandler();
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 380) {
        this.heroSize = 200;
        this.isMobile = true;
      } else if (screenWidth < 750) {
        this.heroSize = 300;
      } else if (screenWidth < 1200) {
        this.heroSize = 350;
      } else {
        this.heroSize = 500;
      }
    },
  },
  computed: {
    ...mapGetters(['getTrendingTopicTags']),
    ...mapState({
      isRequestingTrending: (state) => state.topics.isRequesting,
      collections: (state) => state.topics.collections,
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
