import request from "@utils/request";

/**
 * 按照下面例子的格式写请求就行
 */
/* 获取用户最近播放数据 */
export const reqGetRecentlyListen = ({uid, type = 1}) => {
  return request({
    method: "GET",
    url: "/user/record",
    params: {
      uid,
      type
    }
  });
};
/* 获取歌单 */
export const reqGetPlayListDetail = (uid) => {
  return request({
    method: "GET",
    url: "/user/playlist",
    params: {
      uid
    }
  });
};

