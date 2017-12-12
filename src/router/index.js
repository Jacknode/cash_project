import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

export default new Router({
  mode:'history',//本地开发加上，上线注释
  routes
})
