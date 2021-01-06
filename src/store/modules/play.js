// import { reqGetRecentlyListen, reqGetPlayListDetail } from "@api/my";
// import dayjs from 'dayjs';
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
      /**
       * 1.向正在播放列表中添加一首歌
       * 2.如果歌曲已经存在，则不能添加
       */
      const res = state.isPlayingList.find((item) => item.id === data.id)
      if(res) return;
      state.isPlayingList.unshift(data);
    },

  }
};
