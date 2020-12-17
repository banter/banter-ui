<template>
  <div class="carousel-header-container">
    <router-link class="carousel-header-label" :to="`/topics/${topic.value}/${topic.id}`">
      <img svg-inline class="icon" src='../assets/play-button.svg' alt="example" />
      <p>{{topic.value}}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CarouselHeader',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
  .carousel-header-container {
    display: flex;
    flex-direction: row;
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .carousel-header-label {
    display: flex;
    flex-direction: row;
    margin: auto;
    text-decoration: none;
    color: inherit;

    p {
      margin: auto 25px;
    }
  }
</style>
