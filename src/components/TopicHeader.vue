<template>
  <div class="header-card card-wrapper">
    <b-card no-body>
    <b-img v-if="imageLoadingError" class="header-card"
     :src="require('../assets/Banter_logo_dark.png')"/>
     <b-img v-else class="header-card"
     :src="currentImageUrl"
     @error="imageLoadError" />
      <b-card-text class="header-card-text">
         <h3>{{currentTopic.name}}</h3>
      </b-card-text>

    </b-card>
  </div>
</template>

<script>

export default {
  name: 'TopicHeader',
  data() {
    return {
      imageLoadingError: false,
    };
  },
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
  methods: {
    imageLoadError() {
      this.imageLoadingError = true;
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
