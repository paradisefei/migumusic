import request from "@utils/request";
// 榜单数据请求
// 请求新歌数据
export const reqGetNewSongList = () => {
	return request({
		method: "GET",
		url: "/personalized/newsong",
	});
};
