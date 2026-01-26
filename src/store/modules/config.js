const state = {
  showLoginBox: false,
  logo: '',
  cartNum: 0,
  banner: [],
  headerData: {
    home: {title: '', describe: '',},
  }
}
const mutations = {
  setShowLoginBox(state, data) {
    state.showLoginBox = data;
  },
  setLogo(state, data) {
    state.logo = data;
  },
  setCartNum(state, data) {
    state.cartNum = data;
  },
  setBanner(state, data) {
    state.banner = data;
  },
  setHeaderData(state, data) {
    state.headerData = {...state.headerData, ...data};
  },
}
const actions = {
  setShowLoginBox({commit}, data) {
    commit('setShowLoginBox', data);
  },
  setLogo({commit}, data) {
    commit('setLogo', data);
  },
  setCartNum({commit}, data) {
    commit('setCartNum', data);
  },
  setBanner({commit}, data) {
    commit('setBanner', data);
  },
  setHeaderData({commit}, data) {
    commit('setHeaderData', data);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
