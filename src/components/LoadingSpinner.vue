<template>
  <b-spinner
    :variant="variant"
    :key="variant"
  ></b-spinner>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style>

</style>
