import request from "@utils/request";

/**
 * 按照下面例子的格式写请求就行
 */
/* 轮播图数据 */
export const reqGetBannerList = () => {
  return request({
    method: "GET",
    url: "/getbannerlist"
  });
};
/* 推荐歌单数据 */
export const reqGetRecommendPlayList = () => {
  return request({
    method: "GET",
    url: "/recommend/playlist"
  });
};
