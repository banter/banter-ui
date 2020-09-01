<template>
  <div>
    <b-modal :id="modalName" scrollable hide-footer hide-header title="Follow Modal">
      <div class="modal-header">
        <b-icon v-if="isTeamSelectionVisible" @click="toggleTeamSelection()" font-scale="1"
          class="back-button" icon="arrow-left" />
        <h5 class="modal-title">
          {{isTeamSelectionVisible ? 'Select your Favorite Teams': 'Select your Interests' }}
        </h5>
        <button v-if="!isTeamSelectionVisible" type="button" class="corner-button close"
          data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" @click="toggleTeamSelection()">Next</span>
        </button>
        <button v-if="isTeamSelectionVisible" type="button" class="corner-button close"
          data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" @click="closeModal(modalName)">Finish</span>
        </button>
      </div>
      <div class="modal-header">
        <input class="form-control mr-sm-2" type="search"
        v-model="searchText" :placeholder="isTeamSelectionVisible ?
        'Search your favorite teams': 'Search your interests'" aria-label="Search">
      </div>
      <div class="row">
        <div v-if="!isTeamSelectionVisible" class="col tab-content" id="nav-tabContent">
          <div v-if="searchText ==''">
            <team-selection-scroll :teams="getInterestOptions"></team-selection-scroll>
          </div>
          <div v-else>
            <team-selection-scroll
            :teams="searchInterests(this.searchText)"></team-selection-scroll>
          </div>
        </div>
        <div v-else class="col tab-content" id="nav-tabContent">
<div v-if="searchText ==''">
                <b-card no-body>
                          <b-tabs pills nav-class="side-button" content-class="side-button"
            nav-wrapper-class="side-button"
            active-nav-item-class="font-weight-bold text-uppercase text-submit side-button" card
            vertical>
                <b-tab title="NFL" submit>
              <team-selection-scroll :teams="getNFLTeams" :teamsPerRow=2></team-selection-scroll>
            </b-tab>
            <b-tab title="NBA">
              <team-selection-scroll :teams="getNBATeams" :teamsPerRow=2></team-selection-scroll>
            </b-tab>
            <b-tab title="MLB">
              <team-selection-scroll :teams="getMLBTeams" :teamsPerRow=2></team-selection-scroll>
            </b-tab>
            <b-tab title="NHL">
              <team-selection-scroll :teams="getNHLTeams" :teamsPerRow=2></team-selection-scroll>
            </b-tab>
          </b-tabs>
        </b-card>
          </div>
          <div v-else class="col tab-content" id="nav-tabContent">
            <team-selection-scroll :teams="searchTeams(this.searchText)"></team-selection-scroll>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import MODALS from '../../constants/modals';
import API from '../../constants/api';
import TeamSelectionScroll from '../../containers/TeamSelectionScroll.vue';

export default {
  name: 'BaseOnboardingModal',
  computed: {
    ...mapGetters(['getIfUserShouldOnboard', 'getInterestOptions', 'getNFLTeams', 'getMLBTeams', 'getNHLTeams',
      'getNBATeams', 'getLeagues', 'searchTeams', 'searchInterests']),
    ...mapState({
      returningUser: (state) => state.modals.userHasAccount,
    }),
    ifUserShouldOnboard() {
      return this.getIfUserShouldOnboard;
    },

    toggleVisibleContent() {
      return !this.isTeamSelectionVisible;
    },
    groupedArticles() {
      return _.chunk(this.getLeagues, 3);
    },
  },
  watch: {
    ifUserShouldOnboard() {
      if (this.getIfUserShouldOnboard) {
        this.$bvModal.show(MODALS.BASE_ONBOARDING_MODAL);
      }
    },
  },
  mounted() {
    // if (this.getIfUserShouldOnboard) {
    // this.$bvModal.show(MODALS.BASE_ONBOARDING_MODAL);
    // }
  },

  props: {
    loginHeader: {
      type: String,
      required: false,
      default: () => 'Log In',
    },
  },

  components: {
    TeamSelectionScroll,
  },

  methods: {
    closeModal(modal) {
      if (this.isRequesting) return;
      Object.assign(this, { authEmail: null, authPassword: null, authName: null });
      this.$root.$emit('bv::hide::modal', modal);
    },
    toggleTeamSelection() {
      this.searchText = '';
      this.isTeamSelectionVisible = !this.isTeamSelectionVisible;
    },
  },
  data() {
    return {

      windowLocation: window.location.href,
      API,
      modalName: MODALS.BASE_ONBOARDING_MODAL,
      isTeamSelectionVisible: false,
      searchText: '',
    };
  },

};
</script>

<style scoped lang="scss">

.back-button{
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 8px;
}

.modal-header {
    padding-top: .1rem;
    padding-bottom: .5rem;
    padding-left: .1rem;
    padding-right: .1rem;
}

.corner-button {
    float: right;
    font-size: .8rem;
    font-weight: 700;
    line-height: 2;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
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
