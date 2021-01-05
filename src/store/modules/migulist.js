import { reqGetNewSongList } from "@api/migulist";

export default {
	state: {
		newSongList: [],
	},
	getters: {},
	actions: {
		async getNewSongList({ commit }) {
			const newSongList = await reqGetNewSongList();
			commit("GET_NEW_SONG_LIST", newSongList);
		},
	},
	mutations: {
		GET_NEW_SONG_LIST(state, newSongList) {
			state.newSongList = newSongList;
		},
	},
};
