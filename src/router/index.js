/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const home = () => import('@/components/proposals/home/homePage.vue');
const create = () => import('@/components/proposals/create/create.vue');


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/chat', abstract: true, component: home },
    { path: '/', abstract: true, component: create },
    { path: '/*', redirect: '/' },
  ]
});
