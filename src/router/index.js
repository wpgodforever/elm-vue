import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta: {
        title: '直接访问'
      }
    },
    {
      name: 'home',
      path: '/home',
      meta: {
        title: '首页'
      },
      component: () => import('../pages/home')//统一采用异步加载路由的方式
    },
  ]
})

export default router
