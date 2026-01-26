import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from '@/store/modules/user'
import config from '@/store/modules/config'

import getters from '@/store/getters'

export default new Vuex.Store({
  getters,
  modules: {
    user, config
  }
})
