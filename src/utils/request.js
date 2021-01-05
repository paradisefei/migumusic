import axios from "axios";
import { Message } from "element-ui";

// 引入进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 通过其值来区分运行环境
// console.log(process.env.NODE_ENV); // development  production
const prefix_url = process.env.NODE_ENV === "development" ? "/" : "http://81.69.57.198:3000";

const instance = axios.create({
  //  / 就是当前服务器地址
  baseURL: `${prefix_url}api`, // 公共的基础路径
  headers: {
    // token: 'xxx' // 不行，登录接口不需要
  }
});

// 设置请求拦截器
instance.interceptors.request.use(
  config => {
    // config 请求的配置对象
    // 将来发送请求（请求地址，请求参数，请求方式等）都会在config中找

    // 开始进度条
    NProgress.start();

    return config;
  }
  // 初始化Promise.resolve()返回默认成功的Promise，只会触发成功的回调
  // () => {},
);
// 设置响应拦截器
instance.interceptors.response.use(
  // 响应成功：当响应状态码为 2xx
  response => {
    // 进度条结束
    NProgress.done();
    // console.log("response", response);
    // 判断响应的code是否是200
    if (response.status === 200) {
      // 返回成功的响应数据
      return response.data;
    }

    const { message } = response.data;
    // 提示错误
    Message.error(message);
    // 功能失败 --> 返回失败的Promise
    return Promise.reject(message);
  },
  // 响应失败：当响应状态码不是 2xx
  error => {
    // console.dir(error);
    // 进度条结束
    NProgress.done();
    const message = error.message || "网络错误";
    // 提示错误
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;
