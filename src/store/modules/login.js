import { reqToLogin } from "@api/login";

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
      console.log(commit);
      console.log(res);
      commit("GET_LOGIN", res);
    }
    /* 获取新歌单信息 */
  },
  mutations: {
    GET_LOGIN(state, res) {
      state.userMsg = res;
      state.nickname = res.profile.nickname;
      state.avatarUrl = res.profile.avatarUrl;
      state.uid = res.profile.userId;
    }
  }
};
