import request from "@utils/request";

/**
 * 按照下面例子的格式写请求就行
 */
/* 登录 */
export const reqSearchKeyWords = keywords => {
  return request({
    method: "GET",
    url: `/search?keywords=${keywords}`
  });
};
