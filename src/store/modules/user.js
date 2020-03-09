const state = {
  userInfo: {}, // 用户信息
  platform: {
    douyin: {} // 包含登录状态和信息
  }
}

const mutations = {
  SET_USER_INFO(state, payload) {
    state.userInfo = payload
  },
  SET_PLATFORM_STATE(state, payload) {
    state.platform[payload.platform] = payload.value
  }
}

const actions = {
  getUserInfo({ commit }, payload) {
    commit('SET_USER_INFO', {})
  },
  setPlatformState(context, payload) {
    // todo
    context.commit('SET_PLATFORM_STATE', { platform: 'douyin', value: {}})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
