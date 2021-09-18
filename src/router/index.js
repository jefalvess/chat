/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const perfil = () => import('@/components/proposals/perfil/page.vue');
const create = () => import('@/components/proposals/create/page.vue');
const login = () => import('@/components/proposals/login/page.vue');


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/', abstract: true, component: login },
    { path: '/create', abstract: true, component: create },
    { path: '/perfil', abstract: true, component: perfil },
    { path: '/*', redirect: '/' },
  ]
});
