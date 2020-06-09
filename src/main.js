import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios';


// 网络请求相关
axios.defaults.baseURL = "http://140.143.151.98:9995/"

//响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 911) {
      router.replace({
        path: '/login' // 到登录页重新获取token
      })
    }
    return response
  })
//拦截器带token
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = token  //请求头加上token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })


Vue.prototype.$http = axios

//---------------------------------------------------------------------
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
