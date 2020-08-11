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
          <TopicCard type="hero-card-3d" :key="topic.id" :topic="topic" :index="i" />
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
  props: {
    topics: {
      type: Array,
      required: true,
      default: () => [],
    },
    heroSize: {
      type: Number,
      required: true,
      default: () => 300,
    },
  },
  components: {
    TopicCard,
    Slide,
    Carousel3d,
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
  width:70%;
  margin-bottom:30px;
}
</style>
