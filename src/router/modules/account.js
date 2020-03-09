import Layout from '@/layout/index'
const system = {
  path: '/account',
  component: Layout,
  children: [
    {
      path: 'manager',
      component: () => import(/* webpackChunkName: "manager" */ '@/views/account/manager/index'),
      meta: { title: '账号管理' }
    }
  ]
}

export default system
