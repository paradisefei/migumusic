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

/* 四大金刚图片 */
export const reqGetFourForKingKong = () => {
  return request({
    method: "GET",
    url: "/getfourforkingkong"
  });
};
/* 推荐歌单数据 */
export const reqGetRecommendPlayList = () => {
  return request({
    method: "GET",
    url: "/recommend/playlist"
  });
};
/* 新歌速递信息 */
