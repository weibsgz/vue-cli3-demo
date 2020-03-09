import Layout from '@/layout/index'
const video = {
  path: '/video',
  component: Layout,
  children: [
    {
      path: 'manager',
      component: () => import(/* webpackChunkName: "video-manager" */ '@/views/video/manager/index'),
      meta: { title: '视频管理' }
    }, {
      path: 'publish',
      component: () => import('@/views/video/publish/index'),
      meta: { title: '发布视频' }
    }
  ]
}

export default video
