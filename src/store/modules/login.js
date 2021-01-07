import { reqToLogin, reqToLogout } from "@api/login";

export default {
	state: {
		nickname: "",
		avatarUrl: "",
		uid: "",
		userMsg: "",
	},
	getters: {},
	actions: {
		/* 获取用户的基本信息 */
		async getLogin({ commit }, data) {
			const res = await reqToLogin(data);
			console.log("请求回来的用户基本信息", res);
			// console.log(res.cookie);
			commit("GET_LOGIN", res);
		},
		/* 退出登录 */
		async getLogout({ commit }) {
			await reqToLogout();
			commit("GET_LOGOUT");
		},
	},
	mutations: {
		// 登录
		GET_LOGIN(state, res) {
			window.localStorage.setItem('userMsg', res.cookie)
			state.userMsg = res;
			state.nickname = res.profile.nickname;
			state.avatarUrl = res.profile.avatarUrl;
			state.uid = res.profile.userId;
			console.log("vuex中的用户基本信息", state);
		},
		// 退出登录
		GET_LOGOUT(state) {
			state.nickname = "";
			state.avatarUrl = "";
			state.uid = "";
			state.userMsg = "";
		},
	},
};
