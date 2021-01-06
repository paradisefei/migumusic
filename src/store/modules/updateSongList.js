import {
	reqGetUpdateSongListName,
	// reqGetUpdateSongListDesc,
	// reqGetUpdateSongListCover,
} from "@api/updateSongList";
// 创建歌单
export default {
	state: {
		updateSongListName: "",
	},
	getters: {},
	actions: {
		// 更新歌曲名字
		async getUpdateSongListName({ commit }, { id, name }) {
			console.log(id, name);
			const updateSongListName = await reqGetUpdateSongListName({ id, name });
			console.log(updateSongListName);
			commit("GET_UPDATE_SONG_LIST_NAME", updateSongListName);
		},
	},
	mutations: {
		// 发送请求更新歌曲名
		GET_UPDATE_SONG_LIST_NAME(state, updateSongListName) {
			state.updateSongListName = updateSongListName;
			// createSongList.unshift()
			// state.createSongList = createSongList.map((item) => {
			// 	let { id, playlist } = item;
			// 	return {
			// 		id,
			// 		name: playlist.name,
			// 		imgUrl: playlist.coverImgUrl,
			// 	};
			// });
		},
	},
};
