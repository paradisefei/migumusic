import request from "@utils/request";

// 列表请求
export const reqGetArtList = (type, area, initial) => {
  return request({
    method: "GET",
    url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=18`
  });
};

// 搜索歌手名

export const reqSearchArtName = name => {
  return request({
    method: "GET",
    url: `/search?keywords=${name}&type=1000`
  });
};
