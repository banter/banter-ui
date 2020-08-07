<template>
  <div>
    <like-auth-modal :ref="MODALS.LIKE_AUTH_MODAL"/>
    <follow-auth-modal :ref="MODALS.FOLLOW_AUTH_MODAL"/>
    <auth-modal :ref="MODALS.AUTH_MODAL"/>
    <for-you-auth-modal :ref="MODALS.FOR_YOU_AUTH_MODAL"/>
    <passive-auth-modal :ref="MODALS.PASSIVE_AUTH_MODAL"/>
    <share-modal></share-modal>
  </div>
</template>

<script>
import MODALS from '../../constants/modals';

import LikeAuthModal from './LikeAuthModal.vue';
import FollowAuthModal from './FollowAuthModal.vue';
import AuthModal from './AuthModal.vue';
import ForYouAuthModal from './ForYouAuthModal.vue';
import PassiveAuthModal from './PassiveAuthModal.vue';
import ShareModal from './ShareModal.vue';

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
    ForYouAuthModal,
    PassiveAuthModal,
    ShareModal,
  },
};
</script>
