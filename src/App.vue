<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.fullPath"/>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`;
    },
  },
  //   data() {
  //   return {
  //     logo: ROOT_PATH + require('./assets/logo.png')
  //   }
  // },
  metaInfo() {
    return {

      title: 'Epiloge - Build your network in your field of interest',
      meta: [
        // Twitter Card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Vue Social Cards Example' },
        { name: 'twitter:description', content: 'Vue sample site showing off Twitter and Facebook Cards.' },
        // image must be an absolute path
        // { name: 'twitter:image', content: this.logo },
        // Facebook OpenGraph
        { property: 'og:title', content: 'Vue Social Cards Example' },
        { property: 'og:site_name', content: 'Vue Example' },
        { property: 'og:type', content: 'website' },
        // { property: 'og:image', content: this.logo },
        { property: 'og:description', content: 'Vue sample site showing off Twitter and Facebook Cards.' },
      ],
    };
  },
};
</script>
<style lang="scss">
  $fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
  @import "~@fortawesome/fontawesome-free/scss/fontawesome";
  @import "~@fortawesome/fontawesome-free/scss/solid"; // fas
  @import "~@fortawesome/fontawesome-free/scss/regular"; // far
  @import "~@fortawesome/fontawesome-free/scss/brands"; // fab

  #nav-signup {
    padding: 0 0;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 5px;
    margin-right: 5px;
    background: none;
    color: black;
  }

  #nav-signup:hover {
    color: white;
    background: black;
  }

  #nav-signup-text {
    height: 25px;
    left: 17px;
    right: 15.9px;
    top: calc(50% - 25px/2 + 0.31px);

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;
    margin: 7px 20px;
  }

  .social-logins {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin: 5px;
    width: 300px;
    margin: auto;
    .social-login {
      margin: 5px;
      width: 300px;
      display: flex;
      justify-content: space-between;
    }

  }
</style>
