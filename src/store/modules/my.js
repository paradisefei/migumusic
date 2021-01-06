import { reqGetRecentlyListen, reqGetPlayListDetail } from "@api/my";
import dayjs from 'dayjs';

export default {
  state: {
    // 最近播放
    recentlyListen: [],
    // 用户歌单
    playListDetail: [],
  },
  getters: {},
  actions: {
    /* 获取用户最近播放 */
    async getRecentlyListen({ commit }, data) {
      const res = await reqGetRecentlyListen(data);
      commit("GET_RECENTLY_LISTEN", res);
    },
    /* 获取用户歌单 */
    async getPlayListDetail({ commit }, uid) {
      const res = await reqGetPlayListDetail(uid);
      commit("GET_PLAYLIST_DETAIL", res);
    }
  },
  mutations: {
    GET_RECENTLY_LISTEN(state, res) {
      /**
       * 1.对请求回来的数据进行处理
       */
      state.recentlyListen = res.weekData.map((item) => {
        let song = item.song;
        return {
          id: song.id,
          pic: song.al.picUrl,
          singer: song.ar[0].name,
          song: song.name,
          album: song.al.name
        }
      });
    },
    GET_PLAYLIST_DETAIL(state, res) {
      /**
        * 1.对请求回来的数据进行处理
        * 2.需要的信息有
        *   图片，名称，曲目数，创建日期，修改/删除按钮，歌单id
      */
      state.playListDetail = res.playlist.map((item) => {
        let { id, name, coverImgUrl, trackCount, createTime } = item;
        createTime = dayjs(createTime).format("YYYY-MM-DD");
        return {
          id,
          name,
          coverImgUrl,
          trackCount,
          createTime
        }
      });
    }
  }
};
