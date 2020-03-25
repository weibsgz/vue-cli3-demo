import { publishManageStatus } from "@/api/publish-manage";
import * as publish from "@/api/publish";

const state = {
  publishManageStatus: [], // 发布视频管理状态
  accountList: [], // 账号列表
  video: {} // 视频信息
};

const mutations = {
  SET_PUBLISH_MANAGE_STATUS(state, dict) {
    state.publishManageStatus = dict;
  },
  ADD_ACCOUNT_INFO(state, payload) {
    // 添加账号信息
    if (Array.isArray(payload.account)) {
      state.accountList = payload.account;
    } else {
      state.accountList.push(payload.account);
    }
  },
  UPDATE_ACCOUNT_CHK_STAT(state, payload) {
    // 更新选中状态
    let { index, checked } = payload;
    state.accountList[index].checked = checked;
  },
  UPDATE_ACCOUNT_FORM_INFO(state, payload) {
    // 更新账号form信息
    let { index, info } = payload;
    for (let key in info) {
      state.accountList[index]["form"][key] = info[key];
    }
  },
  UPDATE_VIDEO_INFO(state, payload) {
    // 更新video信息
    state.video = payload.video;
  }
};

const actions = {
  getPublishManageStatus({ commit }, payload) {
    return publishManageStatus().then(({ data }) => {
      commit("SET_PUBLISH_MANAGE_STATUS", data);
      return data;
    });
  },
  ADD_ACCOUNT_INFO({ commit }, payload = {}) {
    // 添加账号信息
    return new Promise(async (resolve, reject) => {
      if (Object.keys(payload).length === 0) {
        let res = await publish.publishMyAccount();
        let accountList = res.data.filter(item => +item.status === 1 || +item.status === 2);
        accountList.forEach((item, index) => {
          item.form = { account_id: item.id };
          item.checked = false;
          item.index = index;
        });
        commit("ADD_ACCOUNT_INFO", { account: accountList });
        resolve();
      } else {
        commit("ADD_ACCOUNT_INFO", payload);
        resolve();
      }
    });
  },
  UPDATE_ACCOUNT_CHK_STAT({ commit }, payload) {
    // 更新选中状态
    commit("UPDATE_ACCOUNT_CHK_STAT", payload);
  },
  UPDATE_ACCOUNT_FORM_INFO({ commit }, payload) {
    // 更新账号form信息
    commit("UPDATE_ACCOUNT_FORM_INFO", payload);
  },
  UPDATE_VIDEO_INFO({ commit }, payload) {
    // 更新video信息
    commit("UPDATE_VIDEO_INFO", payload);
  }
};

const getters = {
  getAllAccountChkStat(state) {
    // 获取账号是否有选中状态
    return state.accountList.some(item => item.checked);
  },
  getAccountById: state => id => {
    // 根据id获取账号信息
    let account = state.accountList.find(item => +item.id === +id);
    return account !== undefined ? account : null;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
