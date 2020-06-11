<template>
  <div :class="`card-wrapper ${type}-wrapper`">
    <router-link :to="`/topics/${topic.value}`">
      <div :class="`image-card ${imageClass} ${type}`">
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
      default: 0
    },
    topic: {
      type: Object,
      required: true,
      default: () => {return {}}
    },
    type: {
      type: String,
      required: true,
      default: () => ""
    }
  },
  computed: {
    imageClass: function() {
      switch (this.index % 3) {
        case 0:
          return "cage"
        case 1:
          return "corgi"
        case 2:
          return "bear"
        default:
          return "placeimg"
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}

// The hover overlay
.image-card {
  &:after {
    content: "";
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    transition: all 1s;
    -webkit-transition: all 1s;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
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
    bottom: 10px;
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

// Carousel Card styles
.carousel-card {
  min-height: 250px;
  max-height: 350px;
  min-width: 250px;
  max-width: 350px;

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

.cage::after {
  background: url('https://www.placecage.com/700/700');
}
.corgi::after {
  background: url('http://placecorgi.com/500/500');
}

.bear::after {
  background: url('http://placebear.com/500/500');
}

.placeimg::after {
  background: url('http://placeimg.com/500/500');
}
</style>