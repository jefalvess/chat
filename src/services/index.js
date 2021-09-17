/* eslint-disable prettier/prettier */
import axios from 'axios';
import axiosTiming from 'axios-timing';

import Vue from 'vue';

import store from '../store';

axios.defaults.timeout = 110000;

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL
});
axiosTiming(axios, timeInMs => console.log(`${timeInMs.toFixed()}ms`));

instance.interceptors.request.use(async config => {
  if (
    !store.getters.cookieUserJson ||
    store.getters.cookieUserJson.length == 0
  ) {
    const response = await axios.get('/api/user/cookie');
    if (response.data && response.data.token) {
      store.dispatch('setCookieUserJson', response.data);
    }
  }

  config.headers = {
    Authorization: `Bearer ${store.getters.cookieUserJson.token}`,
    authtoken: process.env.VUE_APP_TOKEN,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  return config;
});

// interceptops
instance.interceptors.response.use(null, async error => {
  // Se der timeout eu jogo para pagina de erro
  const string = error.toString();
  if (string.indexOf('Error: timeout of 110000ms exceeded') !== -1) {
    store.dispatch('setLoadingPage', false);
    const URL = window.location.href;
    const currentUrl = window.location.origin;
    if (URL.split('/')[3] !== 'error') {
      window.location.assign(`${currentUrl}/error`);
    }
  }
  //  se por algum motivo nao conseguir se conectar com o outro microserviço eu jogo para pagina de erro
  if (!error.response) {
    store.dispatch('setLoadingPage', false);
    const URL = window.location.href;
    const currentUrl = window.location.origin;
    if (URL.split('/')[3] !== 'error') {
      window.location.assign(`${currentUrl}/error`);
    }
  }

  //  Se der um erro no backend eu manda o apalicaçao soltar um notifiçao dizendo que deu erro na conexao com backend
  // é precido deixar codigo de notifiçao no componente principal da pagina
  if (error.response.status === 500) {
    store.dispatch('setLoadingPage', false);
    let ts = new Date();
    Vue.notify({
      group: 'foo-css',
      type: 'error',
      title: `${error.response.data.message}`,
      text: ` Contact technical support <br><br>
          ${ts.toDateString()} ${ts.toLocaleTimeString()}`,
      speed: 500,
      duration: 5000
    });
  }

  // Erro de autenticaçao no token jwt
  if (error.response.status === 400) {
    const currentUrl = window.location.origin;
    window.location.assign(`${currentUrl}/api/user/login`);
  }

  return Promise.reject(error);
});


axios.get('/api/token').then(function (response) {

   if (response.data && response.data.token) { 
         window.ticky.setToken(response.data.token);
    }

}).catch(function (error) {
 console.log(error);
})


const criarUsuario = payload => instance.get(`/api/getlistproposals`, payload);



export default {
  criarUsuario,
};
