<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Share Modal">
      <h2 class="share-header">Share</h2>
      <div class="share-network-list">
        <ShareNetwork v-for="network in NETWORKS" :network="network.network" :key="network.network"
          :url="sharing.url" :title="sharing.title" :description="sharing.description"
          :quote="sharing.quote" :hashtags="sharing.hashtags" :twitterUser="sharing.twitterUser">
          <a class="share-network" role="button" :style="{backgroundColor: network.color}">
            <!-- Leaving for now if we want to switch to more Vue style
            Reference: https://medium.com/front-end-weekly/
            how-to-use-fon-awesome-5-on-vuejs-project-ff0f28310821  -->
            <!-- <font-awesome-icon  :icon="['fab', network.icon]" size="lg" /> -->
            <i :class="network.icon"></i>
            <span>{{ network.name }}</span>
          </a>
        </ShareNetwork>
        <a class="share-network" v-clipboard="'https://banteraudio.com/share'"
          v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler"
          role="button"
          :style="isClipboardSelected
          ? {backgroundColor: '#008000'} : {backgroundColor: '#808080'}">
          <i class="far fah fa-lg fa-clipboard"></i>
          <span>Copy to Clipboard</span>
        </a>
      </div>
    </b-modal>

  </div>
</template>

<script>

import NETWORKS from '../../constants/banter-networks';

export default {
  name: 'ShareModal',
  components: {
  },
  data() {
    return {
      returningUser: true,
      NETWORKS,
      clipboardSelected: false,
      windowLocation: window.location.href,
      modalName: 'share-modal',
      sharing: {
        url: 'https://banteraudio.com/share',
        title: 'The World is Changing. And so are Podcasts.',
        description: 'Say Hi to the New Way to listen to Podcasts. Go checkout Banter!',
        quote: 'This has changed how I will listen to podcasts forever.',
        hashtags: 'banter,theNewNormal,podcasts',
        twitterUser: 'banteraudio',
      },

    };
  },
  computed: {
    isClipboardSelected() {
      return this.clipboardSelected;
    },
  },
  methods: {

    clipboardSuccessHandler() {
      this.clipboardSelected = true;
    },

    clipboardErrorHandler() {
      this.clipboardSelected = false;
    },
  },
};
</script>

<style lang="scss">

.share-header {
  text-align: center;
}

.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}

.share-network {
  flex: none;
  color: #FFFFFF;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}

.share-network span {
  color: white;
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
}

.share-network i {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;

}

.share-network svg {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  // padding: 10px;
  flex: 0 1 auto;

}

</style>
