import request from '@/utils/request'

// 发布管理 / 视频管理-列表
export function publishManageList(params) {
  return request.get('/publish-manage/list', { params })
}
// 发布管理 / 视频管理-单条视频的状态
export function publishManageStatus(params) {
  return request.get('/publish-manage/status', { params })
}
// 发布管理 / 视频管理-单条发布信息的状态
export function publishManagePublishStatus(params) {
  return request.get('/publish-manage/publish-status', { params })
}
// 发布管理 / 视频管理-发布详情列表
export function publishManagePublishInfo(params) {
  return request.get('/publish-manage/publish-info', { params })
}
// 发布管理 / 视频管理-重新发布列表
export function publishmanageepublishList(params) {
  return request.get('/publish-manage/republish-list', { params })
}
// 发布管理 / 视频管理-重新发布
export function publishmanageepublish(params) {
  return request.get('/publish-manage/republish', { params })
}
// 发布管理 / 视频管理-删除
export function publishManageDelVideo(params) {
  return request.get('/publish-manage/del-video', { params })
}
