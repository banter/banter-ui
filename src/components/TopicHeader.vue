<template>
  <div class="header-card card-wrapper">
    <b-card no-body>
    <b-img v-if="loadError || useDefaultImage" class="header-card card-img"
    :src="require('../assets/Banter_logo_dark.png')"/>
    <b-img v-else class="header-card card-img" :src="currentImageUrl" @error="imageLoadError" />
      <b-card-text class="header-card-text">
        <slot>
         <h3 class="header-card-text-content">{{currentTopic.name}}</h3>
         <FollowButton :topic="currentTopic.primaryTag" class="header-follow"/>
         <share-button></share-button>
        </slot>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import FollowButton from './FollowButton.vue';
import ShareButton from './commons/ShareButton.vue';

export default {
  name: 'TopicHeader',
  components: {
    FollowButton,
    ShareButton,
  },
  data() {
    return {
      loadError: false,
    };
  },
  props: {
    currentTopic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    useDefaultImage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    currentImageUrl() {
      return this.currentTopic?.primaryTag?.imageUrl;
    },
  },
  methods: {
    imageLoadError() {
      this.loadError = true;
    },
  },
};
</script>

<style lang="scss" scoped>

.card {
    background: none;
    border: none;

}

.card-img {
    object-fit: contain;
    max-height: 600px;
}
@media (max-width: 800px)  {
.header-card-text-content{
  font-size: 1rem;
}
}
.header-card-text {
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  width: fit-content;
  position: absolute;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  display: flex;
}

@media (max-width: 800px)  {
  .header-card-text {
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  opacity: .6;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 10px;
  // left: 10px;
  padding: 5px;
  font-size: 1rem;
}
}

.card-wrapper {
  margin: auto;
  position: relative;
  cursor: pointer;
}
.header-card {
  max-width: 1000px;
  max-height: 500px;
  border: none;
}

.header-follow {
  margin-right: 15px;
  margin-left: 15px;
}
</style>
