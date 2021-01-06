import { reqToLogin, reqToLogout } from "@api/login";

export default {
  state: {
    nickname: "",
    avatarUrl: "",
    uid: "",
    userMsg: ""
  },
  getters: {},
  actions: {
    /* 获取用户的基本信息 */
    async getLogin({ commit }, data) {
      const res = await reqToLogin(data);
      commit("GET_LOGIN", res);
    },
    /* 退出登录 */
    async getLogout({ commit }) {
      await reqToLogout();
      commit("GET_LOGOUT");
    }
  },
  mutations: {
    // 登录
    GET_LOGIN(state, res) {
      state.userMsg = res;
      state.nickname = res.profile.nickname;
      state.avatarUrl = res.profile.avatarUrl;
      state.uid = res.profile.userId;
    },
    // 退出登录
    GET_LOGOUT(state){
      state.nickname = "";
      state.avatarUrl = "";
      state.uid = "";
      state.userMsg = "";
    }
  }
};
