<template>
  <div>
    <like-auth-modal :ref="MODALS.LIKE_AUTH_MODAL"/>
    <follow-auth-modal :ref="MODALS.FOLLOW_AUTH_MODAL"/>
    <auth-modal :ref="MODALS.AUTH_MODAL"/>
    <my-feed-auth-modal :ref="MODALS.MY_FEED_AUTH_MODAL"/>
  </div>
</template>

<script>
import MODALS from '../../constants/modals';

import LikeAuthModal from './LikeAuthModal.vue';
import FollowAuthModal from './FollowAuthModal.vue';
import AuthModal from './AuthModal.vue';
import MyFeedAuthModal from './MyFeedAuthModal.vue';

export default {
  name: 'AllModals',
  data() {
    return {
      MODALS,
    };
  },
  components: {
    FollowAuthModal,
    LikeAuthModal,
    AuthModal,
    MyFeedAuthModal,
  },
};
</script>
