import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout/index";
import Login from "@/views/login/index";
// import system from "./modules/system";
// import account from "./modules/account";
// import statistics from "./modules/statistics";
// import video from "./modules/video";

Vue.use(VueRouter);
const files = require.context("./modules", false, /\.js$/);
const routerList = [];
files.keys().forEach(key => {
  //files(key).default 取得每一项路由的内容 因为都是default导出
  routerList.push(files(key).default);
});

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout
  },
  ...routerList,
  // system,
  // account,
  // statistics,
  // video,
  { path: "/login", component: Login, meta: { title: "ç™»é™†" } },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404" }
];

const createRouter = () =>
  new VueRouter({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes
  });

const router = createRouter();

export default router;
