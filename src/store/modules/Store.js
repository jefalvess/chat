const state = {
  cookieUserJson: [],
  loadingPage: [],
  idDocument: '',
  modalEdit: '',
  responseLogic: []
};
const getters = {
  cookieUserJson: state => state.cookieUserJson,
  loadingPage: state => state.loadingPage,
  idDocument: state => state.idDocument,
  modalEdit: state => state.modalEdit,
  responseLogic: state => state.responseLogic
};
const mutations = {
  setCookieUserJson: (state, payload) => {
    state.cookieUserJson = payload;
  },
  setLoadingPage: (state, payload) => {
    state.loadingPage = payload;
  },
  setIdDocument: (state, payload) => {
    state.idDocument = payload;
  },
  setModalEdit: (state, payload) => {
    state.modalEdit = payload;
  },
  setResponseLogic: (state, payload) => {
    state.responseLogic = payload;
  }
};
const actions = {
  setCookieUserJson({ commit }, payload) {
    commit('setCookieUserJson', payload);
  },
  setLoadingPage({ commit }, payload) {
    commit('setLoadingPage', payload);
  },
  setIdDocument({ commit }, payload) {
    commit('setIdDocument', payload);
  },
  setModalEdit({ commit }, payload) {
    commit('setModalEdit', payload);
  },
  setResponseLogic({ commit }, payload) {
    commit('setResponseLogic', payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
