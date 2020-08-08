<template>
  <div>
    <b-card-group :class="isMobile ? '' : 'desktop-follow-cards'" columns>
      <b-card
        style="border: none"
        class="mb-4"
        v-for="(topic, index) in suggestFollowingTrendingTags"
        :key="`follow-suggestion-${index}`">
        <div>
          <TopicCard type="carousel-card" allowFollow :topic="topic" :index="index" />
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import TopicCard from './TopicCard.vue';

export default {

  name: 'FollowSuggestionCards',
  components: {
    TopicCard,
  },
  computed: {
    ...mapGetters(['suggestFollowingTrendingTags']),
    ...mapState({
      isMobile: (state) => state.sizing.isMobile,
    }),
  },
};
</script>

<style lang="scss" scoped>
.desktop-follow-cards {
    margin-left: 85px;
}

@media (min-width: 600px) {
    .card-columns {
        column-count: 1;
    }
}

@media (min-width: 800px) {
    .card-columns {
        column-count: 2;
    }
}

@media (min-width: 1100px) {
    .card-columns {
        column-count: 3;
    }
}

@media (min-width: 1350px) {
    .card-columns {
        column-count: 4;
    }
}
</style>
