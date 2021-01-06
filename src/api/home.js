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
    url: "/top/playlist/highquality"
  });
};
/* 新歌速递信息 */
// 华语   /playlist/detail?id=21845217
export const reqGetQuickPlayList = id => {
  return request({
    method: "GET",
    url: `/playlist/detail?id=${id}`
  });
};

/* 新歌 */
//  /personalized/newsong
export const reqGetNewSong = () => {
  return request({
    method: "GET",
    url: "/personalized/newsong"
  });
};
/* 专辑 */
//  /personalized/newsong
export const reqGetAlbumList = () => {
  return request({
    method: "GET",
    url: "/album/list/style?area=Z_H&limit=5"
  });
};
/* 推荐电台 */
//  /personalized/newsong
export const reqPersonalized = () => {
  return request({
    method: "GET",
    url: "/personalized/djprogram"
  });
};
/* 热歌榜 */
//  /personalized/newsong
export const reqGetHotTopSongs = id => {
  return request({
    method: "GET",
    url: `/playlist/detail?id=${id ? id : 3778678}`
  });
};

/* RANK轮播   /getRankCoursel */
export const reqGetRankCoursel = () => {
  return request({
    method: "GET",
    url: "/getRankCoursel"
  });
};
