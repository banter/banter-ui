<template>
  <div>
    Test
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loginRequest");
  }
};
</script>
