<template>
  <div class="card-wrapper carousel-card-wrapper">
    <router-link :to="`/topics/${topic.value}`">
      <div class="image-card carousel-card">
          <b-img class="header-image" :src="`https://store.nike.com/nikestore/merchandising/mobile/storefronts/us/landing/football/img/nfl_header_jets.jpg`"/>
        <div class="topic-descriptor">
          <p class="topic-label">
            {{topic.value}}
          </p>
          
        </div>
      </div>
    </router-link>

    <div :class="`card-wrapper carousel-card-wrapper`">
    <div :class="`image-card`">
        Topic Header
    
</div>

</div> 
    </div>

</template>


<script>
export default {
  name: 'TopicHeader',
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => {return {"value": "Austin"}}
    }
  },
    type: {
    type: String,
    required: true,
    default: () => ""
}
}
</script>

<style lang="scss" scoped>

.card-wrapper {
  width: 80%;
  margin: auto;
  position: relative;
  cursor: pointer;
}

// The hover overlay
.image-card {
  position: relative;
  overflow: hidden;
    &:hover {
    .header-image {
      background:rgba(0,0,0,0.6);
      transition: all 1s;
      opacity: 0.5;
      &:after {
        opacity: 1;
      }
    }
  }
  .header-image {
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

// Carousel Card styles
.carousel-card-wrapper {
  .carousel-card {
    min-height: 300px;
    max-height: 1000px;
    // min-width: 250px;
    // max-width: 600px;

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
}
</style>