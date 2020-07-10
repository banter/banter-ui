<template>
  <div :class="`card-wrapper ${type}-wrapper`">
    <router-link :to="`/topics/${topic.value}`">
      <div :class="`image-card ${type}`">
        <b-img class="topic-image" :src="`${topic.imageUrl || 'http://placeimg.com/450/450'}`" />
        <div class="topic-descriptor">
          <p class="topic-label">
            {{topic.value}}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopicCard',
  props: {
    index: {
      type: Number,
      required: true,
      default: 0,
    },
    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    type: {
      type: String,
      required: true,
      default: () => '',
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin: 0 10px;
  position: relative;
  cursor: pointer;
  height:100%;
}

// The hover overlay
.image-card {
  position: relative;
  overflow: hidden;
  height:100%;
  &:hover {
    .topic-image {
      background:rgba(0,0,0,0.6);
      transition: all 1s;
      opacity: 0.5;
      &:after {
        opacity: 1;
      }
    }
  }
  .topic-image {
    position: absolute;
    object-fit: cover;
    max-width: 100%;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    border-radius: 25px;
  }
}

.hero-card-test{

  height: 100%;
  width: auto;
  min-height: auto;
  min-width: auto;

    .topic-descriptor {
    position: absolute;
    background-color: black;
    color: white;
    width: 50%;
    height: 65px;
    left: 0;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topic-label {
    font-style: normal;
    font-weight: 250;
    font-size: 22px;
    text-align: center;
    line-height: 22px;
    height: 100%;
    padding: 20px 0px;
  }

}
// Hero Card styles
.hero-card {
  height: 25vw;
  width: 25vw;
  min-height: 250px;
  min-width: 250px;

  .topic-descriptor {
    position: absolute;
    background-color: black;
    color: white;
    width: 50%;
    height: 65px;
    left: 0;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .topic-label {
    font-style: normal;
    font-weight: 300;
    font-size: 26px;
    text-align: center;
    line-height: 22px;
    height: 100%;
    padding: 20px 0px;
  }
}

// // Carousel Card styles
.carousel-card-wrapper {
  width: 250px;
  height: 250px;
  margin: auto;
  .carousel-card {
      height: 200px;
      width: 200px;

    min-height: 250px;
    max-height: 350px;
    min-width: 250px;
    max-width: 350px;

    &:hover {
      .topic-descriptor {
        transition: all 1.5s;
        background-color :black;
      }
    }

    &::after{
      border-radius: 25px;
    }

    .topic-descriptor {
      background:rgba(0,0,0,0.65);
      color: white;
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      border-radius: 0 0 25px 25px;
    }

    .topic-label {
      font-style: normal;
      font-weight: 300;
      font-size: 22px;
      text-align: center;
      line-height: 22px;
      height: 100%;
      padding: 20px 0px;
    }
  }
}
</style>
