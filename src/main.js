import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import CarbonComponentsVue from '@carbon/vue';
import VueCookies from 'vue-cookies';
import DateFilter from './filters/date';

import notifications from 'vue-notification';

Vue.use(VueCookies);

Vue.$cookies.config('4h');

Vue.use(CarbonComponentsVue);

Vue.filter('date', DateFilter);

Vue.use(notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
