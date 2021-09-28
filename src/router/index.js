/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const perfil = () => import('@/components/perfil/page.vue');
const perfilEdit = () => import('@/components/perfilEdit/page.vue');
const perfilVisita = () => import('@/components/perfilVisita/page.vue');
const timeline = () => import('@/components/timeline/page.vue');
const create = () => import('@/components/create/page.vue');
const login = () => import('@/components/login/page.vue');
const chat = () => import('@/components/chat/page.vue');

// import textProposal from '@/systemPages/hw/textEditor/textProposal.vue';
// 


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/', abstract: true, component: login },
    { path: '/create', abstract: true, component: create },
    { path: '/timeline', abstract: true, component: timeline },
    { path: '/perfil', abstract: true, component: perfil },
    { path: '/perfil/edit', abstract: true, component: perfilEdit },
    { path: '/perfil/:id', abstract: true, component: perfilVisita },
    { path: '/chat', abstract: true, component: chat },
    { path: '/*', redirect: '/' },
  ]
});
