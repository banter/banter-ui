import Vue from "vue";
import Router from "vue-router";

import {
  Home
} from "./views/index";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [{
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }]
});
