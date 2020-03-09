import { publishManageStatus } from '@/api/publish-manage'
const state = {
  publishManageStatus: [], // 发布视频管理状态
}

const mutations = {
  SET_PUBLISH_MANAGE_STATUS(state, dict) {
    state.publishManageStatus = dict
  }
}

const actions = {
  getPublishManageStatus({ commit }, payload) {
    return publishManageStatus().then(({ data }) => {
      commit('SET_PUBLISH_MANAGE_STATUS', data)
      return data
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
