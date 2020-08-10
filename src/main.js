import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import Carousel3d from 'vue-carousel-3d';
import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue';

// Analytics
import Hotjar from 'vue-hotjar';
import VueAnalytics from 'vue-analytics';
import VueSocialSharing from 'vue-social-sharing';

import vSelect from 'vue-select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShareAlt, faCommentDots, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Clipboard from 'v-clipboard';
import store from './store/index';
import router from './router/index';
import App from './App.vue';

import Default from './layouts/Default.vue';
import Landing from './layouts/Landing.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

Vue.use(Clipboard);
library.add(faShareAlt);
library.add(faClipboard);
library.add(faCommentDots);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Hotjar, {
  id: '1897223',
  isProduction: process.env.NODE_ENV.toUpperCase() === 'PRODUCTION',
});

Vue.use(VueAnalytics, {
  id: 'UA-172462319-1',
  router,
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.use(Carousel3d);
Vue.use(VueSocialSharing);
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
Vue.component('v-select', vSelect);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
