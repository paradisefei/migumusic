import request from "@utils/request";

/**
 * 按照下面例子的格式写请求就行
 */
/* 登录 */
export const reqToLogin = ({phone, password}) => {
  return request({
    method: "GET",
    url: "/login/cellphone",
    params: {
      phone,
      password
    }
  });
};

