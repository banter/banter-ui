<template>
  <div class="header-card card-wrapper">
    <div>
      <b-card no-body class="overflow-hidden for-you-header">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="require('../assets/Favicon.png')" alt="Image"
              class="rounded-0"></b-card-img>
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
  name: 'ForYouHeader',
};
</script>

<style lang="scss" scoped>

.for-you-text{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    color: #030303;
}

.for-you-col{
display: flex;
  justify-content: center;
  align-items: center;
}

.for-you-header{
    margin:auto;
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

.header-card-text {
  background: black;
  color: white;
  width: fit-content;
  position: absolute;
  margin: auto;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  display: flex;
}

@media (max-width: 800px)  {
  .header-card-text {
  background: black;
  opacity: .6;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px
}
}

.card-wrapper {
  margin: auto;
  position: relative;
}
.header-card {
  max-width: 1000px;
  max-height: 500px;
  border: none;
}

.header-follow {
  margin: 0 15px;
}
</style>
