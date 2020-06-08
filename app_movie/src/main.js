import Vue from 'vue'
import App from './App.vue'
import router from '../routers'
import store from '../stores'
import Axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.prototype.axios=Axios;

Vue.config.productionTip = false
// 全局过滤器
Vue.filter('setWH',(url,arg)=>{
  return url.replace(/w\.h/,arg);
})
// 全局组件
Vue.component('Scroller',Scroller)
Vue.component('Loading',Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
