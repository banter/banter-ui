<template>
  <div class="landing-home">
    <div class="landing-content">
      <h1 class="marketing-message"> The New Way to Listen to Sports Talk</h1>
      <b-img fluid class="landing-image" :src="require('../../assets/radio.png')" alt="Radio"/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Landing',
};
</script>

<style scoped>

.landing-home {
  background-color: #F8ECDC;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}

.landing-content {
  padding-top: 100px;
}
.marketing-message {
  text-align: center;
}
.landing-image {
  margin: auto;
  display: flex;
}
</style>
