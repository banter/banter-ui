<template>
  <div class="hero-topic-card-container">
    <TopicCard type="hero-card" v-for="(topic, i) in topics" :key="topic.id" :topic="topic" :index="i"/>
  </div>
</template>

<script>
import TopicCard from "../components/TopicCard"

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
    TopicCard
  }
}
</script>

<style>
.hero-topic-card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>