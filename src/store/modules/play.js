import { reqGetSongUrl, reqGetSongLyric } from "@api/play";
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
    // 播放歌曲的下标
    checkedRowIndexVuex: 0,
    // 歌曲的url
    songUrl: "",
    songLyric: "",
    songListId: []
  },
  getters: {},
  actions: {
    // 获取歌词
    async getSongLyric({ commit }, id){
      /**
       * 1.如果是纯音乐的话是没有歌词的
       */
      const res = await reqGetSongLyric(id);
      if (res.code === 200) {
        // console.log(res);
        commit("GET_SONG_LYRIC", res);
      }
    },
    // 获取歌曲的url
    async getSongUrl({ commit }, id) {
      const res = await reqGetSongUrl(id);
      if (res.code === 200) {
        // console.log(res);
        commit("GET_SONG_URL", res);
      }
    },
    // 修改被选中行的index
    changeCheckedRowIndex({ commit }, index) {
      commit("CHANGE_CHECKED_ROW_INDEX", index)
    },
    /* 点击播放时向正在播放列表中添加某一首歌曲信息 */
    addOneSong({ commit }, data) {
      commit("ONE_SONG", data);
    },
    getIsPlayingSong({ commit }, data) {
      // console.log(data);
      commit("GET_IS_PLAYING_SONG", data);
    }
  },
  mutations: {
    // 清空isPlayingList
    CLEAR_IS_PLAYING_LIST(state){
      state.isPlayingList = [];
    },
    // 修改index
    CHANGE_CHECKED_ROW_INDEX(state, index) {
      state.checkedRowIndexVuex = index;
    },
    // 歌曲的url
    GET_SONG_URL(state, res) {
      state.songUrl = res.data[0].url;
    },
    // 歌曲的歌词
    GET_SONG_LYRIC(state, res) {
      /**
       * 1.如果是纯音乐的话是没有歌词的
       */
      if(res.nolyric){
        /**
         * 1.没有歌词
         */
        state.songLyric = "暂无歌词";
        return;
      }
      state.songLyric = res.lrc.lyric;
    },
    ONE_SONG(state, data) {
      const res = state.isPlayingList.find((item) => item.id === data.id)
      if (res) return;
      state.isPlayingList.unshift(data);
    },
    GET_IS_PLAYING_SONG(state, data) {
      /**
       * 1.如果添加的歌曲已经存在在了播放列表中，直接开始播放那首歌
       *  1.拿到那首歌的下标
       *  2.修改播放列表中的播放行下标
       */
      state.isPlayingSong = data;
      const res = state.isPlayingList.find((item, index) => { 
        if(item.id === data.id){
          state.checkedRowIndexVuex = index;
          console.log(state.checkedRowIndexVuex);
          return true;
        }
        state.checkedRowIndexVuex = 0;
      });
      if (res) return;
      state.isPlayingList.unshift(data);
    },
    ALL_SONG(state, data) {
      const { songList, id } = data;
      const res = state.songListId.find(item => item.id === id);
      if (res) return;
      state.songListId.push({ id });
      songList.forEach(item => {
        state.isPlayingList.unshift(item);
      });
    },
    SEARCH_SONG(state, data) {
      console.log("vuex", data);
      state.isPlayingList = [];
      state.isPlayingList = data;
    }
  }
};
