import Vue from 'vue'
import VueRouter from 'vue-router'
import tabbar from './tabbar/index.js'
import login from './login/index.js'

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
    login,
  ]
})

export default router
