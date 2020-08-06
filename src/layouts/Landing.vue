<template>
  <div id="welcome-to-banter-app">
    <slot/>
    <AllModals/>
  </div>
</template>

<script>
import AllModals from '../components/modals/AllModals.vue';

export default {
  name: 'welcome-to-banter',
  components: {
    AllModals,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
</style>
