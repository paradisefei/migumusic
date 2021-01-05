// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

// 路由组件懒加载
// 1. 会将路由组件打包成单独的js文件（webpack代码分割）
// 2. 异步加载路由组件（需要使用才加载）（Vue异步加载组件功能）
const Home = () => import(/* webpackChunkName: "Home" */"../views/Home");
const My = () => import(/* webpackChunkName: "My" */"../views/My");
const Listen = () => import(/* webpackChunkName: "Listen" */"../views/My/Listen");
const MyList = () => import(/* webpackChunkName: "Listen" */"../views/My/MyList");
const Create = () => import(/* webpackChunkName: "Listen" */"../views/My/MyList/Create");
const Play = () => import(/* webpackChunkName: "Play" */"../views/Play");
const MiGuList = () => import(/* webpackChunkName: "MiGuList" */"../views/MiGuList");

// 重写push和replace方法
// 目的：为了让编程式导航重复点击时不报错~
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  // 如果用户想处理失败，就处理
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  // 如果用户不处理失败，给默认值：空函数
  return push.call(this, location, onComplete, () => {});
};

VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  // 如果用户想处理失败，就处理
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  // 如果用户不处理失败，给默认值：空函数
  return replace.call(this, location, onComplete, () => {});
};

// 安装插件
Vue.use(VueRouter);

const router = new VueRouter({
	// 路由模式
	mode: "hash",
	// mode: "history",
	// 路由配置
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/home",
			component: Home,
		},
		{
			path: "/my",
			component: My,
			redirect:"/my/listen",
			meta: {
				hideNavBar: true,
			},
			children: [
				{
					path:"listen",
					component: Listen,
					meta: {
						hideNavBar: true,
					},
				},
				{
					path:"mylist",
					component: MyList,
					meta: {
						hideNavBar: true,
					},
					children: [
						{
							path:"create",
							component: Create,
						}
					]
				}
			]
		},
		{
			path: "/play",
			component: Play,
			meta: {
				showPlay: true,
			},
		},
		{
			path: "/migulist",
			component: MiGuList,
		}
	],
	// 每次切换路由页面滚动条位置
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

export default router;
