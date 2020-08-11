<template>
  <div>
    <b-modal @show="onShow" :id="modalName" hide-footer hide-header title="Share Modal">
      <h2 class="share-header">Share</h2>
      <div class="share-network-list">
        <ShareNetwork v-for="network in NETWORKS" :network="network.network" :key="network.network"
          :url="`${shareUrlNetwork}${network.network}`" :title="sharing.title"
          :description="sharing.description" :quote="sharing.quote" :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser">
          <a class="share-network" role="button" :style="{backgroundColor: network.color}">
            <!-- Leaving for now if we want to switch to more Vue style
            Reference: https://medium.com/front-end-weekly/
            how-to-use-fon-awesome-5-on-vuejs-project-ff0f28310821  -->
            <!-- <font-awesome-icon  :icon="['fab', network.icon]" size="lg" /> -->
            <i :class="network.icon"></i>
            <span>{{ network.name }}</span>
          </a>
        </ShareNetwork>
        <a class="share-network" @click="copy()" role="button">
          <i class="far fah fa-lg fa-clipboard"></i>
          <span>Copy to Clipboard</span>
        </a>
        <b-toast id="clipboard-toast" no-close-button=true static auto-hide-delay="1000">
          Copied to Clipboard
        </b-toast>
        <b-toast id="clipboard-toast=error" no-close-button=true static auto-hide-delay="1000">
          Unable to copy to clipboard
        </b-toast>
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
      modalName: 'share-modal',
      sharing: {
        url: 'https://banteraudio.com ',
        title: 'The New Way to Listen to Sports Talk.',
        description: 'Say Hi to the New Way to listen to Podcasts. Go checkout Banter!',
        quote: 'Sports radio will never be the same.',
        hashtags: 'banter,theNewNormal,podcasts',
        twitterUser: 'banteraudio',
      },

    };
  },
  computed: {
    shareUrlNetwork() {
      return `${this.sharing.url}?source=`;
    },
    shareUrlClipboard() {
      return `${this.sharing.url}?source=clipboard`;
    },
  },
  methods: {

    onShow() {
      this.clipboardSelected = false;
      this.sharing.url = `${window.location.href}`;
    },

    async copy() {
      try {
        await navigator.clipboard.writeText(this.shareUrlClipboard);
        this.$bvToast.show('clipboard-toast');
      } catch (error) {
        this.$bvToast.show('clipboard-toast-error');
      }
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
