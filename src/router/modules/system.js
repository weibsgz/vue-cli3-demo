import Layout from '@/layout/index'
const system = {
  path: '/system',
  component: Layout,
  children: [
    {
      path: 'user',
      component: () => import(/* webpackChunkName: "user" */ '@/views/system/user/index'),
      meta: { title: '用户管理' }
    }
  ]
}

export default system
