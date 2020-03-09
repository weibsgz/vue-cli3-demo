import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "./store/index";
import { getPageTitle } from "@/utils/index";
import Cookies from "js-cookie";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const token = Cookies.get("token");
  console.log("token", token);
  //有TOKEN 代表已经登录过了
  if (token) {
    const hasRoles = store.getters.menu && store.getters.menu.length > 0;
    if (hasRoles) {
      //如果已经是登录状态了并且有菜单生成了就去第一个菜单的子菜单
      if (to.path === "/login") {
        // 跳转第一个菜单
        const path = store.getters.menu[0]["children"][0]["path"];
        next({ path, replace: true });
      }
    } else {
      //如果还没有获取菜单就先获取菜单
      await store.dispatch("nav/getMenu");
      await store.dispatch("dict/getPublishManageStatus");
      const query = Object.assign({ replace: true }, to);
      //如果登录了 就去菜单的第一个子菜单
      if (to.path === "/login") {
        query.path = store.getters.menu[0]["children"][0]["path"];
      }
      next(query);
    }
  } else {
    //TOKEN失效 如果是登录页就去登录页 不是登录页也跳到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
