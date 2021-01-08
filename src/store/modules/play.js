import { reqGetSongUrl } from "@api/play";
/**
 * 1.批量添加歌曲到播放列表
 * 2.获取歌曲时长
 */
export default {
	state: {
		// 正在播放的列表
		isPlayingList: [],
		// 正在播放的歌曲
		isPlayingSong: null,
		// 歌曲的url
		songUrl: "",
		songListId: [],
	},
	getters: {},
	actions: {
		// 获取歌曲的url
		async getSongUrl({ commit }, id) {
			const res = await reqGetSongUrl(id);
			if (res.code === 200) {
				console.log(res);
				commit("GET_SONG_URL", res);
			}
		},
		/* 点击播放时向正在播放列表中添加某一首歌曲信息 */
		addOneSong({ commit }, data) {
			commit("ONE_SONG", data);
		},
		getIsPlayingSong({ commit }, data) {
			console.log(data);
			commit("GET_IS_PLAYING_SONG", data);
		},
	},
	mutations: {
		// 歌曲的url
		GET_SONG_URL(state, res) {
			state.songUrl = res.data[0].url;
		},
		ONE_SONG(state, data) {
			const res = state.isPlayingList.find((item) => item.id === data.id);
			if (res) return;
			state.isPlayingList.unshift(data);
		},
		GET_IS_PLAYING_SONG(state, data) {
			state.isPlayingSong = data;
			const res = state.isPlayingList.find((item) => item.id === data.id);
			if (res) return;
			state.isPlayingList.unshift(data);
		},
		ALL_SONG(state, data) {
			const { songList, id } = data;
			const res = state.songListId.find((item) => item.id === id);
			if (res) return;
			state.songListId.push({ id });
			songList.forEach((item) => {
				state.isPlayingList.unshift(item);
			});
		},
		SEARCH_SONG(state, data) {
			console.log("vuex", data);
			state.isPlayingList = [];
			state.isPlayingList = data;
		},
		// 榜单页面使用
		ADD_SONG(state, data) {
			// 正确操作：直接把操作的数组赋值给播放列表
			state.isPlayingList = [];
			state.isPlayingList = data;
			// 错误操作:把传递的数组加入到数组中
			// state.isPlayingList.push(data);
			// console.log("res", res);
		},
		PLAY_SONG(state, data) {
			state.isPlayingList = data;
			// console.log("PLAY_SONG", data);

			// playlist.forEach((item) => {
			// 	state.isPlayingList.unshift(item);
			// });
		},
	},
	//
};
