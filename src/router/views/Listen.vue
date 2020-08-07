<template>
  <div>
    <div :class="isMobile ? '' : 'desktop-side-nav'">
      <b-nav :vertical="!isMobile" :class="`${isMobile ? '' : 'side-nav-content'} for-you-nav`">
        <b-nav-item v-for="(link) in sideLinks" :key="link.text" @click="switchStreams(link)"
          :class="isMobile ? 'mobile-nav-item' : ''" :active="link.stream === activeStream">
          <b-icon :icon="link.stream === activeStream ? link.activeIcon : link.inactiveIcon" />
          <span class="nav-text">{{link.text}}</span>
        </b-nav-item>
      </b-nav>
    </div>
    <div class="main-content">
      <div v-if="isLoading" class="loading-body">
        <LoadingSpinner variant="secondary" />
      </div>
      <div v-if="!isLoading">
        <div v-if="playlistExists() > 0">
          <div>
            <CustomTopicHeader :topic="activeLink">
              <h3 class="header-card-text-content">{{activeLink.text}}</h3>
            </CustomTopicHeader>
            <discussion-playlist :collection="streamContent(activeLink.stream)"/>
          </div>
        </div>
        <div v-else>
          <follow-suggestion-cards/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import LoadingSpinner from '../../components/LoadingSpinner.vue';
import CustomTopicHeader from '../../components/CustomTopicHeader.vue';
import FollowSuggestionCards from '../../components/FollowSuggestionCards.vue';
import DiscussionPlaylist from '../../containers/DiscussionPlaylist.vue';

export default {
  name: 'Listen',
  components: {
    LoadingSpinner,
    CustomTopicHeader,
    DiscussionPlaylist,
    FollowSuggestionCards,
  },
  async mounted() {
    // TODO Discuss if this should be ran every time we visit the page?
    this.fetchCurrentStream();
  },
  props: {
    stream: {
      type: String,
      required: false,
      default: 'for-you',
    },
  },
  data() {
    return {
      sideLinks: [
        {
          text: 'For You', stream: 'for-you', inactiveIcon: 'house', activeIcon: 'house-fill', content: this.forYou,
        },
        // { text: 'Discover', inactiveIcon: 'soundwave', activeIcon: 'soundwave' },
        {
          text: 'Following', stream: 'following', inactiveIcon: 'people', activeIcon: 'people-fill', content: this.forYou,
        },
      ],
      activeStream: this.stream,
    };
  },
  computed: {
    ...mapState({
      currentDiscussion: (state) => state.audio.currentDiscussion,
      currentUser: (state) => state.users.currentUser,
      isLoading: (state) => state.listen.isRequestingListen,
      forYou: (state) => state.listen.forYou,
      following: (state) => state.listen.following,
      isMobile: (state) => state.sizing.isMobile,
    }),
    activeLink() {
      return this.sideLinks.find((link) => link.stream === this.activeStream);
    },
  },
  methods: {
    ...mapActions(['fetchForYou', 'fetchFollowing']),
    streamContent(stream) {
      switch (stream) {
        case 'for-you':
          return this.forYou;
        case 'following':
          return this.following;
        default:
          return {};
      }
    },
    playlistExists(stream) {
      return this.streamContent(stream || this.activeLink.stream)?.playlist?.length;
    },
    async fetchCurrentStream() {
      switch (this.activeStream) {
        case 'for-you':
          if (!this.playlistExists(this.activeStream)) await this.fetchForYou();
          break;
        case 'following':
          if (this.currentUser.email && !this.playlistExists(this.activeStream)) {
            await this.fetchFollowing();
          }
          break;
        default:
          break;
      }
    },
    switchStreams(link) {
      if (link.stream !== this.activeStream) {
        this.$router.replace(link.stream);
        this.activeStream = link.stream;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main-content {
  margin: auto;
  width: 80%;
  margin-top: 50px;
  margin-bottom: 100px;
}
.loading-body {
    position: relative;
    margin-left: 50%;
    margin-right: 50%;
}

.desktop-side-nav {
  z-index: 1;
  height: 100%;
  top: 0;
  position: fixed;
}

.side-nav-content {
  margin-top: 120px;
}

.for-you-nav {
  font-size: 22px;
  z-index: 1;
  .nav-link.active {
    color: #fe2c55;
  }
  .nav-link {
    color: black;
    padding: 10px 20px;
    span.nav-text {
      padding-left: 20px;
      font-weight: bolder;
    }
    &:hover {
      background: rgba(22,24,35,0.03);
    }
  }
  .nav-item.mobile-nav-item {
    width: 50%;
  }
}
</style>
