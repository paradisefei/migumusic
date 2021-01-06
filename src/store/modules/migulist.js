import { reqGetNewSongList } from "@api/migulist";

export default {
	state: {
		newSongList: [],
	},
	getters: {},
	actions: {
		async getNewSongList({ commit }) {
			const res = await reqGetNewSongList();
			console.log(res);
			commit("GET_NEW_SONG_LIST", res);
		},
	},
	mutations: {
		GET_NEW_SONG_LIST(state, res) {
			state.newSongList = res.result.map((item) => {
				let { id, picUrl } = item;
				let { artists, name, album, duration} = item.song;

				return {
					id,
					pic: picUrl,
					singer: artists[0].name,
					song: name,
					album: album.name,
					time: duration
				}
			});
		},
	},
};
