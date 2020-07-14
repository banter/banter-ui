<template>
  <div class="header-card card-wrapper">
    <b-card overlay :img-src="currentImageUrl" img-alt="Card Image"
      class="header-card">
      <b-card-text class="header-card-text">
         <h3>{{currentTopic.name}}</h3>
      </b-card-text>

    </b-card>
  </div>
</template>

<script>

export default {
  name: 'TopicHeader',
  props: {
    currentTopic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    currentImageUrl() {
      return this.currentTopic?.primaryTag?.imageUrl;
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
    background: none;

}

.card-img {
    object-fit: contain;
    max-height: 600px;
}

.header-card-text {
  background: black;
  opacity: .6;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 30px;
  left: 60px;
  padding: 15px
}

@media (max-width: 800px)  {
  .header-card-text {
  background: black;
  opacity: .6;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px
}
}

.card-wrapper {
  margin: auto;
  position: relative;
  cursor: pointer;
}
.header-card {
  max-width: 1000px;
  // min-width: 320px;
  border: none;
}
</style>
