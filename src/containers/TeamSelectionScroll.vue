<template>
<b-card-text class="scroll">
                <div v-for="(teams, index) in groupedTeams" class="row" :key="index">
                  <div v-for="team in teams"
                    class="col justify-content-center"
              style="text-align: center"
                  :key="team.id">
                    <follow-button :topic="team"
                     v-bind:isOnboardingButton="true"></follow-button>
                  </div>
                </div>
              </b-card-text>
</template>

<script>

import _ from 'lodash';
import FollowButton from '../components/FollowButton.vue';

export default {
  name: 'TeamSelectionScroll',
  components: {
    FollowButton,
  },
  props: {
    teams: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    groupedTeams() {
      return _.chunk(this.teams, 3);
    },
  },
};
</script>

<style lang="scss">

.scroll {
    max-height: 300px;
    overflow-y: auto;
}
</style>
