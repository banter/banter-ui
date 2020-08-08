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
            <b-card-body class='for-you-body'>
              <b-card-text :class="`for-you-text`">
               <b style="margin-right:10px"><slot/></b> {{topic.text}}
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
  props: {
    topic: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    type: {
      type: String,
      required: false,
      default: 'for-you',
    },
  },
};
</script>

<style lang="scss" scoped>

.for-you-body {
  padding: 0;
}

.for-you-text {
  display: flex;
  margin-bottom: 0;
  line-height: 1.15;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 46px;
  color: #030303;
}

.for-you-col {
  padding: 0;
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
