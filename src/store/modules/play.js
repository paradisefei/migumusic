
/**
 * 1.批量添加歌曲到播放列表
 * 2.获取歌曲时长
 */
export default {
  state: {
    // 正在播放的列表
    isPlayingList: []
  },
  getters: {},
  actions: {
    /* 点击播放时向正在播放列表中添加某一首歌曲信息 */
    async addOneSong({ commit }, data) {
      commit("ONE_SONG", data);
    },
  },
  mutations: {
    ONE_SONG(state, data) {
      const res = state.isPlayingList.find((item) => item.id === data.id)
      if(res) return;
      state.isPlayingList.unshift(data);
    },

  }
};
