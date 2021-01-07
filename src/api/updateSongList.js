import request from "@utils/request";

// 更新歌单名
export const reqGetUpdateSongListName = ({ uid, id, name }) => {
	return request({
		method: "GET",
		url: "/playlist/name/update",
		params: {
			id,
      name,
      uid
		},
	});
};
// 更新歌单描述
export const reqGetUpdateSongListDesc = ({ uid, id, desc }) => {
	return request({
		method: "GET",
		url: "/playlist/desc/update",
		params: {
			id,
      desc,
      uid
		},
	});
};
// 更新歌单图片
export const reqGetUpdateSongListCover = ({ uid, id }) => {
	return request({
		method: "GET",
		url: "/playlist/cover/update",
		params: {
      id,
      uid
		},
	});
};
