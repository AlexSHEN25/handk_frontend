import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import {getLocal} from '@/utils/auth'
import router from '../router'
import {i18n} from '@/lang'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_SITE
})

service.interceptors.request.use(config => {
  const {token} = getLocal('userInfo')
  if (!!token) {
    config.headers['token'] = token
  }

  // const {method} = config;
  // if(method === 'get') {
  //   if(Object.prototype.toString.call(config.params) === '[object Object]') {
  //     config.params.lang = i18n.locale;
  //   } else {
  //     config.params = {
  //       lang: i18n.locale
  //     };
  //   }
  // } else {
  //   if(Object.prototype.toString.call(config.data) === '[object Object]') {
  //     config.data.lang = i18n.locale;
  //   } else {
  //     config.data = {
  //       lang: i18n.locale
  //     };
  //   }
  // }

  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === '200' || res.resp_code === '200' || res.code === 200 || res.resp_code === 200) {
      return response.data
    } else if (res.code === '401') {
      store.dispatch('config/setShowLoginBox', true)
      return Promise.reject(res)
    } else if (res.code == 101) {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    } else {
      // Message({
      //   message: res.msg,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }
    return Promise.reject(res)
  }, error => {
    console.log('err-->>' + error)
    if (error.response) {
      if (error.response.status === 401 && error.response.data) {
        // store.dispatch('config/setShowLoginBox', true)
      }
    }
    return Promise.reject(error.response.data)
  })

export default service
