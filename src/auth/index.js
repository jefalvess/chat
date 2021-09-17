/* eslint-disable prettier/prettier */
import axios from 'axios';
import store from '../store';
const checkAccess = async function() {
  try {
    const response = await axios.get('/api/user/cookie');
    if (response.data.isProposal === true && response.status === 200) {
      return store.dispatch('setCookieUserJson', response.data);
    } else {
      return window.open(`${window.location.origin}/api/user/sso/error`, '_self');
    }
  } catch (e) {
    return window.open(`${window.location.origin}/api/user/sso/error`, '_self');
  }
};

const checkAccessManager = async function() {
  try {
    const response = await axios.get('/api/user/cookie');
    if (response.data.isManager === true && response.status === 200) {
      return store.dispatch('setCookieUserJson', response.data);
    } else {
      return window.open(`${window.location.origin}/api/user/sso/error`, '_self');
    }
  } catch (e) {
    return window.open(`${window.location.origin}/api/user/sso/error`, '_self');
  }
};



export default {
  checkAccess,
  checkAccessManager
};
