<template>
  <div class="header-card card-wrapper">
    <div>
      <b-card no-body class="overflow-hidden for-you-header">
        <b-row no-gutters class="m-2">
          <b-col md="6">
            <b-card-img
              :src="require('../assets/Favicon.png')"
              alt="Image"
              class="rounded-0 for-you-header-image"></b-card-img>
          </b-col>
          <b-col md="6" class="for-you-col">
            <b-card-body>
              <b-card-text class="for-you-text">
               For You
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CustomTopicHeader',
};
</script>

<style lang="scss" scoped>
.for-you-text {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  color: #030303;
}

.for-you-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.for-you-header {
  margin: auto;
  max-width: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background: none;
  border: none;

}

.card-img {
  object-fit: contain;
  max-height: 600px;
}

.card-wrapper {
  margin: auto;
  position: relative;
}

.for-you-header-image {
    height: 115px;
}
</style>
