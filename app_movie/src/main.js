import Vue from 'vue'
import App from './App.vue'
import router from '../routers'
import store from '../stores'
import Axios from 'axios'
Vue.prototype.axios=Axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
