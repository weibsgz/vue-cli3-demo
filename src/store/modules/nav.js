import * as api from '@/api/menu'
const state = {
  menu: [],
  submenu: []
}

const mutations = {
  SET_MENU(state, menu) {
    state.menu = menu
  },
  SET_SUBMENU(state, submenu) {
    state.submenu = submenu
  }
}

const actions = {
  async getMenu({ commit }) {
    const menuList = await api.getMenu()
    commit('SET_MENU', menuList)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
