<template>
  <div class="hero-topic-card-container">
    <carousel class="carousel-content" :per-page="5" :paginationEnabled="false" :navigationEnabled="true">
      <slide v-for="(topic, i) in collection.relatedTopics" :key="topic.id">
        <CarouselTopicCard  :topic="topic.tag" :index="i"/>
      </slide>
    </carousel>
  </div>
</template>

<script>
import CarouselTopicCard from "../components/CarouselTopicCard"
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'TopicCarouselScroll',
  props: {
    collection: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    CarouselTopicCard,
    Carousel,
    Slide
  }
}
</script>

<style>
.hero-topic-card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.carousel-content {
  width: 95%;
  margin: 10px;
}
</style>