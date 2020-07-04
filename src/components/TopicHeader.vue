<template>
  <div class="header-card card-wrapper">
  <b-card
    overlay
    :img-src="headerImage"
    img-alt="Card Image"
    class="header-text"
  >
      <b-card-text class="header-card-text">
        <h4> {{headerText}}</h4>
    </b-card-text>

  </b-card>
    </div>
</template>

<script>
export default {
  name: 'TopicHeader',
  props: {
    headerText: {
      type: String,
      required: true,
      default: () => ""
    },
    headerImage: {
      type: String,
      required: true,
      default: () => ""
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