<template>
  <div>
    <CarouselHeader :topic="collection.primaryTopic.tag"/>
    <div class="topic-card-container">
      <carousel class="carousel-content"
        :per-page="5"
        :paginationEnabled="false"
        navigationEnabled>
        <slide v-for="(topic, i) in collection.relatedTopics" :key="topic.id">
          <TopicCard type="carousel-card" :topic="topic.tag" :index="i"/>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import TopicCard from '../components/TopicCard.vue';
import CarouselHeader from '../components/CarouselHeader.vue';

export default {
  name: 'TopicCarouselScroll',
  props: {
    collection: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  components: {
    TopicCard,
    CarouselHeader,
    Carousel,
    Slide,
  },
};
</script>

<style>
.topic-card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.carousel-content {
  width: 95%;
  margin: 10px;
}

.carousel-header-container {
  width: 380px;
  height: 70px;
  font-family: Roboto;
  font-size: 24px;
  letter-spacing: 0.25px;
}
</style>
