import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueI18n from 'vue-i18n'
import wow from 'wowjs'
import 'wowjs/css/libs/animate.css';
// import 'animate.css'
// 这块一定要加,否者会有部分动画无法执行
// import 'animate.css/animate.compat.css'
// import 'animate.css/animate.css';
Vue.prototype.$wow = wow
Vue.prototype.$formatTime = formatTime

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueI18n)

import {i18n} from '@/lang'
import {formatTime} from '@/utils/tools'

Vue.filter('formatTime', val => {
  return formatTime(val)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
