/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const chat = () => import('@/components/proposals/chat/chat.vue');
const create = () => import('@/components/proposals/create/create.vue');
const login = () => import('@/components/proposals/login/login.vue');


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/', abstract: true, component: login },
    { path: '/create', abstract: true, component: create },
    { path: '/chat', abstract: true, component: chat },
    { path: '/*', redirect: '/' },
  ]
});
