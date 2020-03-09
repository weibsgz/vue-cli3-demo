const sleep = timer => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
};

export async function getMenu() {
  const menuList = [
    {
      name: "我的账号",
      path: "/account",
      children: [
        { path: "/account/manager", name: "账号管理" },
        { path: "/account/manager1", name: "账号分组" }
      ]
    },
    {
      name: "发布视频",
      path: "/video",
      children: [
        { path: "/video/publish", name: "发布视频" },
        { path: "/video/manager", name: "视频管理" }
      ]
    },
    {
      name: "数据中心",
      path: "/statistics",
      children: [
        { path: "/statistics/overview", name: "数据概览" },
        { path: "/statistics/customReport", name: "自定义报告" },
        { path: "/statistics/commonReports", name: "常用报表" }
      ]
    },
    {
      name: "用户管理",
      path: "/system",
      children: [{ path: "/system/user", name: "用户管理" }]
    }
  ];
  await sleep(500);
  return menuList;
}
