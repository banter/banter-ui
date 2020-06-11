<template>
  <div class="hero-topic-card-container">
    <HeroTopicCard v-for="(topic, i) in topics" :key="topic.id" :topic="topic" :index="i"/>
  </div>
</template>

<script>
import HeroTopicCard from "../components/HeroTopicCard"

export default {
  name: 'TopicHero',
  props: {
    topics: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    HeroTopicCard
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