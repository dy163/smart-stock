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
        name: 'account',  // 账号
        // path: '/account',
        path: '',
        component: () => import('@/pages/account')
      },
      {
        name: 'screening',  // 筛股
        path: '/screening',
        component: () => import('@/pages/screening')
      },
      {
        name: 'buy-trade',  // 交易
        path: '/buy-trade',
        component: () => import('@/pages/buy-trade')
      },
      {
        name: 'sell-trade',  // 交易
        path: '/sell-trade',
        component: () => import('@/pages/sell-trade')
      },
      {
        name: 'shares', //持仓管理
        path: '/shares',
        component: () => import('@/pages/shares')
      },
      { 
        name: 'entrust',  // 委托
        path: '/entrust',
        component: () => import('@/pages/entrust')
      },
      {
        name: 'bargain', // 成交
        path: '/bargain',
        component: () => import('@/pages/bargain')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
