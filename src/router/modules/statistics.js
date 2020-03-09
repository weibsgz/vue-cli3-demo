import Layout from '@/layout/index'
const statistics = {
  path: '/statistics',
  component: Layout,
  children: [
    {
      path: 'overview',
      component: () => import(/* webpackChunkName: "overview" */ '@/views/statistics/overview/index'),
      meta: { title: '数据概览' }
    },{
        path: 'customReport',
        component: () => import(/* webpackChunkName: "customReport" */ '@/views/statistics/customReport/index'),
        meta: { title: '自定义报告' }
      },{
        path: 'commonReports',
        component: () => import(/* webpackChunkName: "commonReports" */ '@/views/statistics/commonReports/index'),
        meta: { title: '常用报表' }
      }
  ]
}
export default statistics