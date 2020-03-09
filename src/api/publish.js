import request from '@/utils/request'

// 发布管理 / 发布视频-获取上传视频token
export function publishToken(params) {
  return request.get('/publish/token', { params })
}
// 发布管理 / 发布视频-获取发布账号
export function publishMyAccount(params) {
  return request.get('/publish/my-account', { params })
}
// 发布管理 / 发布视频-已发布视频列表
export function publishVideoList(params) {
  return request.get('/publish/video-list', { params })
}
// 发布管理 / 发布视频-立即发布
export function publishCreate(obj) {
  return request.post('/publish/create', obj)
}
// 发布管理 / 视频管理-编辑 反显
export function publishView(params) {
  return request.get('/publish/view', { params })
}
// 发布管理 / 七牛云下载接口
export function publishDownFile(params) {
  return request.get('/publish/down-file', { params })
}
