import request from "@/utils/request";

// 用户管理 / 列表
export function userList(params) {
  return request.get("/admin-user/index", { params });
}

// 用户管理 / 启用禁用
export function statusChange(params) {
  return request.get("/admin-user/status", { params });
}

// 用户管理 / 删除用户
export function deleteUser(params) {
  return request.get("/admin-user/delete", { params });
}

// 用户管理 / 用户添加
export function addUser(params) {
  return request.post("/admin-user/create", { params });
}
