import Vue from "vue";
import Vuex from "vuex";
import { TopicsModule as topics } from "./modules/topics";
import { AudioModule as audio } from "./modules/audio";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    audio,
    topics,
  }
});
