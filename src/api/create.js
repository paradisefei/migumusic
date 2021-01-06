import request from "@utils/request";

// 创建歌单
export const reqGetCreateSongList = (name) => {
	return request({
		method: "GET",
		url: "/playlist/create",
		params: { name },
	});
};
