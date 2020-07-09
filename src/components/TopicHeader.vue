<template>
    <div class="header-card card-wrapper">
        <b-card overlay :img-src="currentTopic.primaryTag.imageUrl" img-alt="Card Image" class="header-card">
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
      default: () => ({})
    },
}
}
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
.card-wrapper {
  margin: auto;
  position: relative;
  cursor: pointer;
}
.header-card {
  max-width: 1000px;
  min-width: 320px;
  border: none;
}
</style>