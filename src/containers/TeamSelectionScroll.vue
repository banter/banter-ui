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
    teamsPerRow: {
      type: Number,
      required: false,
      default: 3,
    },
  },
  computed: {
    groupedTeams() {
      return _.chunk(this.teams, this.teamsPerRow);
    },
  },
};
</script>

<style lang="scss">

.row {
    padding-bottom: 10px;
}

.scroll {
    // max-height: 300px;
    // overflow-y: auto;
}
</style>
