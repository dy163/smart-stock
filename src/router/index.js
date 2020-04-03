import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  },
  {
    path: '/',
    component: () => import('@/pages/layout'),
    children: [
      {
        name: 'account',
        path: '/account',
        // path: '',
        component: () => import('@/pages/account')
      }
      // {
      //   name: 'information',
      //   path: '/information',
      //   component: () => import('@/pages/information')
      // },
      // {
      //   name: 'verif',
      //   path: '/verif',
      //   component: () => import('@/pages/verif')
      // },
      // {
      //   name: 'increase',
      //   path: '/increase',
      //   component: () => import('@/pages/increase')
      // },
      // {
      //   name: 'settings',
      //   path: '/settings',
      //   component: () => import('@/pages/settings')
      // },
      // {
      //   name: 'closing-time',
      //   path: '/closing-time',
      //   component: () => import('@/pages/closing-time')
      // }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
