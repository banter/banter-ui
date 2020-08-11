<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Feedback Modal">
      <h5 class="feedback-header">Please DM us your feedback. We would love to chat!</h5>
      <div class="social-logins">
        <div class="share-network-list">
          <div v-for="network in networks" :key="network.network">
            <a class="share-network" role="button" :style="{backgroundColor: network.color}"
              :href="`${network.link}`" target="_blank">
              <i :class="network.icon"></i>
              <span>{{ network.name }}</span>
            </a>
          </div>
        </div>
        <slot name="footer" />
      </div>
    </b-modal>

  </div>
</template>

<script>

export default {
  name: 'BaseAuthModal',
  components: {},
  data() {
    return {
      modalName: 'feedback-modal',
      networks: [{
        network: 'survey',
        name: 'Survey',
        icon: 'fas fa-poll-h',
        color: '#15aabf',
        link: 'hhttps://docs.google.com/forms/d/1kCH9dEkz09pxVmzdhc3Uj6PiUylMa9aAbUMFQgIzp34',
      },
      {
        network: 'twitter',
        name: 'Twitter',
        icon: 'fab fah fa-lg fa-twitter',
        color: '#1da1f2',
        link: 'https://twitter.com/banteraudio',
      },
      {
        network: 'instagram',
        name: 'Instagram',
        icon: 'fab fah fa-lg fa-instagram',
        color: '#E1306C',
        link: 'https://www.instagram.com/banteraudio/',
      },
      ],
    };
  },
};
</script>

<style lang="scss">
.feedback-header {
  text-align: center;
}
</style>
