<template>
  <div>
    {{topic.value}}
  </div>
</template>

<script>

export default {
  name: 'HeroTopicCard',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => {return {}}
    }
  }
}
</script>

<style>

</style>