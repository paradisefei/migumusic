import { reqGetRecommendPlayList } from "@api/home";

export default {
  state: {
    recommendPlayList: []
  },
  getters: {},
  actions: {
    /* 获取推荐歌单信息 */
    async getRecommendPlayList({ commit }) {
      const res = await reqGetRecommendPlayList();
      const recommendPlayList = res.playlists.splice(1, 10);
      commit("GET_RECOMMEND_PLAYLIST", recommendPlayList);
    }
    /* 获取新歌单信息 */
  },
  mutations: {
    GET_RECOMMEND_PLAYLIST(state, recommendPlayList) {
      state.recommendPlayList = recommendPlayList;
    }
  }
};
