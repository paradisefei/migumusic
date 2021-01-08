// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// 路由组件懒加载
// 1. 会将路由组件打包成单独的js文件（webpack代码分割）
// 2. 异步加载路由组件（需要使用才加载）（Vue异步加载组件功能）
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home");
const My = () => import(/* webpackChunkName: "My" */ "../views/My");
const Listen = () => import(/* webpackChunkName: "Listen" */ "../views/My/Listen");
const PlayList = () => import(/* webpackChunkName: "Listen" */ "../views/My/PlayList");
const Create = () => import(/* webpackChunkName: "Listen" */ "../views/My/PlayList/Create");
const Play = () => import(/* webpackChunkName: "Play" */ "../views/Play");
const MiGuList = () => import(/* webpackChunkName: "MiGuList" */ "../views/MiGuList");
const ArtList = () => import(/* webpackChunkName: "ArtList" */ "../views/ArtList");
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
      component: Home
    },
    {
      path: "/home",
      component: Home
    },
    {
      path: "/my",
      component: My,
      redirect: "/my/listen",
      meta: {
        hideNavBar: true
      },
      children: [
        {
          path: "listen",
          component: Listen,
          meta: {
            hideNavBar: true
          }
        },
        {
          path: "playlist",
          component: PlayList,
          meta: {
            hideNavBar: true
          },
          children: [
            {
              path: "create",
              component: Create
            }
          ]
        }
      ]
    },
    {
      name: "play",
      path: "/play",
      component: Play,
      meta: {
        showPlay: true
      }
    },
    {
      path: "/migulist",
      component: MiGuList
    },
    {
      name: "artlist",
      path: "/artlist",
      component: ArtList
    }
  ],
  // 每次切换路由页面滚动条位置
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

// 需要进行权限验证的地址
const permissionPaths = ["/my", "/my/listen", "/my/playlist"];
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
	/*
		to   要去的路由对象($route)
		from 从哪来的路由对象（当前路由对象）($route)
		next 是一个函数：跳转到哪个路由的方法
			比如：要去to这个路由 next()	
						要去登录路由 next('/login')  next({path: '/login'})  next({name: 'login'})
	
		
		权限验证：
			如果用户未登录，不允许去 trade pay center 等路由
	*/

	// if (permissionPaths.indexOf(to.path) > -1) {
	// 	if (store.state.user.token) {
	// 		next();
	// 	} else {
	// 		next("/login");
	// 	}
	// } else {
	// 	next();
	// }

	if (permissionPaths.indexOf(to.path) > -1 && !store.state.login.uid) {
    console.log("触发路由前置守卫");
		return next("/home");
	}

	next();
});
export default router;
