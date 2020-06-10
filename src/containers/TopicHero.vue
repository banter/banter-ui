<template>
  <div>
    <HeroTopicCard v-for="topic in topics" :key="topic.id" :topic="topic"/>
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

</style>