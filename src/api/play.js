import request from "@utils/request";

/**
 * 按照下面例子的格式写请求就行
 */
/* 获取歌曲的url */
export const reqGetSongUrl = (id) => {
  return request({
    method: "GET",
    url: "/song/url",
    params: {
      id
    }
  });
};
/* 获取歌曲的歌词 */
export const reqGetSongLyric = (id) => {
  return request({
    method: "GET",
    url: "/lyric",
    params: {
      id
    }
  });
};


