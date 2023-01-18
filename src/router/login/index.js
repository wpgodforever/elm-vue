export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import('@/pages/login/reset.vue')
  },
]
