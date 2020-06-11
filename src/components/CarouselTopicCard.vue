<template>
  <div class="card-wrapper">
    <router-link :to="`/topics/${topic.value}`">
      <div :class="`hero-card ${imageClass}`">
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
  name: 'CarouselTopicCard',
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

<style scoped>
.card-wrapper {
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}

.hero-card::after {
    content: '\A';
    position: absolute;
    width: 100%; height:100%;
    top:0; left:0;
    background:rgba(0,0,0,0.6);
    opacity: 0;
    transition: all 1s;
    -webkit-transition: all 1s;
}

.hero-card:hover:after {
    opacity: 1;
}

.hero-card {
  min-height: 150px;
  min-width: 150px;
}

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

.hero-card::after {
  content: "";
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
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