// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入初始化文件
import './assets/js/flexible'
//引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
//引入swiper
import '../node_modules/swiper/css/swiper.min.css'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
//引入font
import './assets/fonts/iconfont.css'
//引入接口文件
import api from './common/api'
Vue.prototype.$api = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
