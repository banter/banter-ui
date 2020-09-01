<template>
  <div>
    <like-auth-modal :ref="MODALS.LIKE_AUTH_MODAL"/>
    <follow-auth-modal :ref="MODALS.FOLLOW_AUTH_MODAL"/>
    <auth-modal :ref="MODALS.AUTH_MODAL"/>
    <for-you-auth-modal :ref="MODALS.FOR_YOU_AUTH_MODAL"/>
    <feedback-modal :ref="MODALS.FEEDBACK_MODAL"/>
    <passive-auth-modal :ref="MODALS.PASSIVE_AUTH_MODAL"/>
    <base-onboarding-modal :ref="MODALS.BASE_ONBOARDING_MODAL"/>
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
import FeedbackModal from './FeedbackModal.vue';
import ShareModal from './ShareModal.vue';
import BaseOnboardingModal from './BaseOnboardingModal.vue';

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
    FeedbackModal,
    PassiveAuthModal,
    ShareModal,
    BaseOnboardingModal,
  },
};
</script>
