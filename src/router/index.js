import Vue from "vue";
import Router from "vue-router";

import {
  Home,
  Topic,
  Genres
} from "./views/index";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [{
    path: "/",
    name: 'Topics',
    component: Home
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
  }]
});