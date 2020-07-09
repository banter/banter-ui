import Vue from "vue";
import Router from "vue-router";

import {
  Home,
  Topic,
  Genres,
  TermsAndConditions,
  PrivacyPolicy,
  Landing
} from "./views/index";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
  {
    path: '/',
    name: 'Welcome To Banter',
    component: Landing,
    meta: { layout: 'landing' }
  },
  {
    path: "/home",
    name: 'Home',
    component: Home,
    props: route => ({ loginSuccess: route.query.success, loginError: route.query.error  })
  },
  {
    path: '/topics/:topicName',
    name: 'Topic',
    component: Topic
  },
  {
    path: '/genres',
    name: 'Genres',
    component: Genres
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    component: PrivacyPolicy
  },
  {
    path: '/terms',
    name: 'Terms and Conditions',
    component: TermsAndConditions
  }
]
});