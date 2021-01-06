import request from "@utils/request";

// 更新歌单名
export const reqGetUpdateSongListName = ({ id, name }) => {
	return request({
		method: "GET",
		url: "/playlist/name/update",
		params: {
			id,
			name,
		},
	});
};
// 更新歌单描述
export const reqGetUpdateSongListDesc = ({ id, desc }) => {
	return request({
		method: "GET",
		url: "/playlist/desc/update",
		params: {
			id,
			desc,
		},
	});
};
// 更新歌单图片
export const reqGetUpdateSongListCover = ({ id }) => {
	return request({
		method: "GET",
		url: "/playlist/cover/update",
		params: {
			id,
		},
	});
};
