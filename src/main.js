import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import Carousel3d from 'vue-carousel-3d';
import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue';
import Hotjar from 'vue-hotjar';
import store from './store/index';
import router from './router/index';
import App from './App.vue';

import Default from './layouts/Default.vue';
import Landing from './layouts/Landing.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(Hotjar, {
  id: '1897223',
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.use(Carousel3d);
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.config.productionTip = false;

moment.locale('en-us');
Object.defineProperty(Vue.prototype, '$moment', {
  value: moment,
});

Vue.component('default-layout', Default);
Vue.component('landing-layout', Landing);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
