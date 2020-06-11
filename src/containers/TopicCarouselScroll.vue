<template>
  <div class="hero-topic-card-container">
    <CarouselTopicCard v-for="(topic, i) in collection.relatedTopics" :key="topic.id" :topic="topic.tag" :index="i"/>
  </div>
</template>

<script>
import CarouselTopicCard from "../components/CarouselTopicCard"

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
    CarouselTopicCard
  }
}
</script>

<style>
.hero-topic-card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>