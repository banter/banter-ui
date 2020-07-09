<template>
  <div>
    <div v-if="size>450" class="hero-topic-card-container-web">
      <TopicCard type="hero-card" v-for="(topic, i) in topics" :key="topic.id" :topic="topic" :index="i" />
    </div>

    <div v-if="size<450" class="hero-topic-card-container-mobile">
      <carousel-3d :width="size" :height="size" :count="topics.length" :controls-visible="true">
        <slide v-for="(topic, i) in topics" :key="topic.id" :topic="topic" :index="i">
          <TopicCard type="hero-card-test" :key="topic.id" :topic="topic" :index="i" />
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import TopicCard from "../components/TopicCard"
import {
  Carousel3d,
  Slide
} from 'vue-carousel-3d';

export default {
  name: 'TopicHero',
  data() {
    return {
      size: 300
    }
  },
  props: {
    topics: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    TopicCard,
    Slide,
    Carousel3d
  },
  mounted() {
    console.log("Created", this.topics)
    window.addEventListener("resize", this.myEventHandler);
    this.myEventHandler()
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      console.log("Event Handler", this.topics)
      console.log("EVENT HANDLER")
      var screenWidth = window.innerWidth;

      if (screenWidth < 360) {
        this.size = 150
        // this.isMobile = false;
      } else if (screenWidth < 750) {
        this.size = 200
        // this.isMobile = false;
      } else if (screenWidth < 1200) {
        this.size = 350
        // this.isMobile = false;
      } else {
        this.size = 500
        // this.isMobile = true
      }
      // your code for handling resize...
    }
  }
}
</script>

<style lang="scss" scoped>

.carousel-3d-slide {
  border: 0;
  background: none;
}

.hero-topic-card-container-mobile {
    /* max-height: 500px;
  min-height: 250px; */
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width:100%
}

.hero-topic-card-container-web {
    /* max-height: 500px;
  min-height: 250px; */
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width:70%
}


</style>