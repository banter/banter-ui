<template>
  <div>
    <b-modal :id="modalName" hide-footer hide-header title="Follow Modal">
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
        v-model="searchText"
        @input="test()"
        :placeholder="isTeamSelectionVisible ?
        'Search your interests' : 'Search your favorite teams'"
        aria-label="Search">
      </div>
      <div class="row">
        <b-card v-if="isTeamSelectionVisible" no-body>
          <b-tabs pills nav-class="side-button"

          content-class="side-button"
          nav-wrapper-class="side-button"
            active-nav-item-class="font-weight-bold text-uppercase text-submit side-button"
 card vertical>
            <b-tab title="Tab 1" submit>
              <b-card-text>
                <div v-for="(networks, index) in groupedArticles" class="row" :key="index">
                  <div v-for="network in networks" class="col-md-auto" :key="network.network">
                    <follow-button v-bind:isOnboardingButton="true"></follow-button>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Tab 2">
              <b-card-text>Tab contents 2</b-card-text>
            </b-tab>
            <b-tab title="Tab 3">
              <b-card-text>Tab contents 3</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
        <div v-else>
          <div class="col tab-content" id="nav-tabContent">
            <div v-for="networks in groupedArticles" :key="networks.id" class="row">
              <div v-for="network in networks" class="col-md-auto" :key="network.network">
                <follow-button v-bind:isOnboardingButton="true"></follow-button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import _ from 'lodash';
import MODALS from '../../constants/modals';
import API from '../../constants/api';
import NETWORKS from '../../constants/banter-networks';
import FollowButton from '../FollowButton.vue';

export default {
  name: 'BaseOnboardingModal',
  computed: {
    ...mapState({
      returningUser: (state) => state.modals.userHasAccount,
    }),
    groupedArticles() {
      return _.chunk(this.NETWORKS, 3);
    },
    toggleVisibleContent() {
      return !this.isTeamSelectionVisible;
    },
  },
  mounted() {
    this.$bvModal.show(MODALS.BASE_ONBOARDING_MODAL);
  },

  props: {
    loginHeader: {
      type: String,
      required: false,
      default: () => 'Log In',
    },
  },

  components: {
    FollowButton,
  },
  methods: {
    closeModal(modal) {
      if (this.isRequesting) return;
      Object.assign(this, { authEmail: null, authPassword: null, authName: null });
      this.$root.$emit('bv::hide::modal', modal);
    },
    toggleTeamSelection() {
      this.isTeamSelectionVisible = !this.isTeamSelectionVisible;
    },
    test() {
      console.log(this.searchText);
    },
  },
  data() {
    return {

      windowLocation: window.location.href,
      API,
      NETWORKS,
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
