import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

import "./plugins/element.js";

// 引入公共资源
import "./styles/reset.css";
import "./styles/row.css";
import "./styles/aplayer.css";
import "./assets/iconfont/iconfont.css";

Vue.config.productionTip = false;

// 懒加载图片

const loadimage = require("@static/lazygif.gif");
const errorimage = require("@static/lazy-load.jpg");

Vue.use(VueLazyload, {
  loading: loadimage,
  error: errorimage
});

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  // 应用router
  router,
  store
}).$mount("#app");
