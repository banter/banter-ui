<template>
  <div>
    <div v-if="heroSize>450" class="hero-topic-card-container-web">
      <TopicCard type="hero-card"
        v-for="(topic, i) in topics"
        :key="topic.id"
        :topic="topic"
        :index="i" />
    </div>

    <div v-if="heroSize<450" class="hero-topic-card-container-mobile">
      <carousel-3d
        :width="heroSize"
        :height="heroSize"
        :count="topics.length"
        :controls-visible="true">
        <slide v-for="(topic, i) in topics" :key="topic.id" :topic="topic" :index="i">
          <TopicCard type="hero-card-test" :key="topic.id" :topic="topic" :index="i" />
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import {
  Carousel3d,
  Slide,
} from 'vue-carousel-3d';
import TopicCard from '../components/TopicCard.vue';

export default {
  name: 'TopicHero',
  data() {
    return {
      heroSize: 300,
    };
  },
  props: {
    topics: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    TopicCard,
    Slide,
    Carousel3d,
  },
  mounted() {
    window.addEventListener('resize', this.myEventHandler);
    this.myEventHandler();
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 360) {
        this.heroSize = 150;
      } else if (screenWidth < 750) {
        this.heroSize = 200;
      } else if (screenWidth < 1200) {
        this.heroSize = 350;
      } else {
        this.heroSize = 500;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.carousel-3d-slide {
  border: 0;
  background: none;
}

.hero-topic-card-container-mobile {
    /* max-height: 500px;
  min-height: 250px; */
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width:100%
}

.hero-topic-card-container-web {
    /* max-height: 500px;
  min-height: 250px; */
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width:70%
}
</style>
