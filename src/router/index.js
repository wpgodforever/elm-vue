import Vue from 'vue'
import VueRouter from 'vue-router'
import tabbar from './tabbar/index.js'
import login from './login/index.js'
import store from '@/store/index.js'

Vue.use(VueRouter)

// 解决路由重定向报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/tabbar',//直接访问/ 会导航到tabbar首页
      meta: {
        title: '直接访问'
      }
    },
    tabbar,
    ...login,
  ]
})

// 路由导航守卫
router.beforeEach((to,from,next) => {
  // 全局的定位地址，若是刷新页面，重新获取
  if(!store.getters['address/currentCity']){
    store.dispatch('address/getCurrentCityAction')
  }
  // 全局的用户信息，若是刷新页面，重新获取
  if(!store.getters['login/userName'] && localStorage.getItem('elm-vue-userId')){
    store.dispatch('login/getUserInfoAction')
  }
  next()
})

export default router
