import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

// 引入stylus文件（base,icon,index,mixin）
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
  path: '/',
  component: goods
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

const router = new VueRouter({
  // 全局配置 <router-link> 默认的激活的 class
  // 设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
