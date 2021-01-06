import { reqGetCreateSongList } from "@api/create";
// 创建歌单
export default {
	state: {
		createSongList: [],
	},
	getters: {},
	actions: {
		async getCreateSongList({ commit }, name) {
			// console.log(1111111);
			const createSongList = await reqGetCreateSongList(name);
			console.log(createSongList);
			console.log(commit);
			// commit("GET_CREATE_SONG_LIST", createSongList);
		},
	},
	mutations: {
		// 发送请求
		GET_CREATE_SONG_LIST(state, createSongList) {
		// 	// createSongList.unshift();
			state.createSongList = createSongList;
		// 	// 更新完数据之后存放在vuex中
		// 	// async GET_CREATE_SONG_LIST(state, createSongList) {
		// 	// 	// createSongList.unshift();
		// 	// 	// 更新完数据之后存放在vuex中
		// 	// 	state.createSongList = await createSongList.map((item) => {
		// 	// 		let { id, playlist } = item;
		// 	// 		return {
		// 	// 			id,
		// 	// 			name: playlist.name,
		// 	// 			imgUrl: playlist.coverImgUrl,
		// 	// 		};
		// 	// 	});
		// 	// },
		},
	},
};
