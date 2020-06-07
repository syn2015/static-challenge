import Vue from 'vue'
import Router from 'vue-router'
import MovieRouter from './Movie'
import MineRouter from './Mine'
import CinemaRouter from './Cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    MovieRouter,
    MineRouter,
    CinemaRouter,
    {
      path:'/*',
      redirect:'movie'
    }
   
  ]
})
