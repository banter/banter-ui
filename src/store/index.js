import Vue from "vue";
import Vuex from "vuex";
import { TopicsModule as topics } from "./modules/topics";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    topics,
  }
});
