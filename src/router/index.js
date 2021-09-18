/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const perfil = () => import('@/components/perfil/page.vue');
const create = () => import('@/components/create/page.vue');
const login = () => import('@/components/login/page.vue');


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
