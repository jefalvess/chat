import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
import VueCookies from 'vue-cookies';

import notifications from 'vue-notification';

Vue.use(VueCookies);

Vue.$cookies.config('4h');

Vue.use(CarbonComponentsVue);

Vue.use(notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
