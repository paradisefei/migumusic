// 汇总所有vuex的模块
import home from "./home";
import login from "./login";
import my from "./my";
import migulist from "./migulist";
import play from "./play";
import create from "./create";
// 统一暴露出去
export default {
  home,
  login,
  my,
  migulist,
  play, 
	create,
}
