export default {
  // tabbar选择页，默认首页

  name: 'tabbarChoose',
  path: '/tabbar',
  redirect: '/tabbar/home',
  meta: {
    title: 'tabbar'
  },
  component: () => import('@/pages/tabbar'),//统一采用异步加载路由的方式
  children: [
    // 商品选择页
    {
      name: 'home',
      path: '/tabbar/home',
      meta: {
        title: '首页'
      },
      component: () => import('@/pages/home')
    },
    // 搜索页
    {
      name: 'search',
      path: '/tabbar/search',
      meta: {
        title: '搜索页'
      },
      component: () => import('@/pages/search')
    },
    // 订单页
    {
      name: 'order',
      path: '/tabbar/order',
      meta: {
        title: '订单页'
      },
      component: () => import('@/pages/order')
    },
    // 个人中心
    {
      name: 'mine',
      path: '/tabbar/mine',
      meta: {
        title: '我的'
      },
      component: () => import('@/pages/mine')
    },
  ]

}
