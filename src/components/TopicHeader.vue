<template>
  <div class="header-card card-wrapper">
  <b-card
    overlay
    img-src="https://ssl.ulximg.com/public/userfiles/2019/03/cam%20newton.jpg"
    
    img-alt="Card Image"
    class="header-text"
  >
      <b-card-text class="header-card-text">
        <h4> {{currentTopic.name}}</h4>
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
      default: () => {return {"value": "Austin"}}
    }
}
}
</script>

<style lang="scss" scoped>

.header-card-text {
  background: black;
  opacity: .6;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 15px;
  left: 15px;
  padding: 15px
}


.card-wrapper {
  margin: auto;
  position: relative;
  cursor: pointer;
}

.header-card {
  max-width: 1000px;
  min-width: 320px;
}

</style>