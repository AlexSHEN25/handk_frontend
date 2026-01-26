import {getLocal, setLocal} from '@/utils/auth'

const state = {
  userInfo: getLocal('userInfo') || {},
}
const mutations = {
  setUserInfo(state, d) {
    state.userInfo = d;
    setLocal('userInfo', d)
  },
}
const actions = {
  setUserInfo({commit}, d) {
    commit('setUserInfo', d);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
