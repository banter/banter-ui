<template>
  <div class="empty-page-wrapper">
        <b-card
    title="Content Not Available"
    :img-src="require('../../assets/Banter_Default_header.png')"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
        <slot>
      Banter Currently has no content for this page.
      We look forward to enhancing our application in the future!
        </slot>
    </b-card-text>
<router-link :to="'/home'" class="navbar-brand d-flex m-auto">
<b-button  type="submit">Go to Homepage</b-button>

</router-link>
</b-card>
  </div>
</template>

<script>

export default {
  name: 'EmptyPageHandler',
};
</script>

<style lang="scss" scoped>

.empty-page-wrapper {
  margin: auto;
  width: fit-content;
  cursor: pointer;
  padding: 5px;
}
</style>
