<template>
  <div class="block">
    <div class="border-bottom">
      <div class="header">
        <h1 class="logo">
          <router-link to="/">
            <img src="../../assets/images/logo.png" />
          </router-link>
        </h1>
        <div>
          <ul class="center">
            <li class="active">音乐</li>
            <li>现场</li>
            <li>会员中心</li>
            <li>凡响计划</li>
            <li>客户端下载</li>
          </ul>
        </div>
        <div class="searchText">
          <input
            class="search"
            type="text"
            name=""
            id=""
            placeholder="搜索歌曲、歌手、MV"
            v-model="keywords"
          />
          <span class="iconfont icon-search" @click="searchKeywords"></span>
        </div>
        <div class="login">
          <!-- 
            1.鼠标移入
              1.如果用户已登录，点击跳转到个人中心页面
           -->
          <div
            class="loginImg"
            @mouseenter="handleLoginShow"
            @mouseleave="handleLoginDis"
            @click="toMy"
          >
            <a>
              <img :src="avatarUrl" alt="" v-if="avatarUrl" />
              <img src="../../assets/images/no-login.png" alt="" v-else />
            </a>
          </div>
          <div class="loginPageCon">
            <!-- 登录和不登录显示的是两个弹窗 -->
            <!-- 未登录时的弹窗 -->
            <div
              class="loginPage"
              v-show="showLogin"
              @mouseenter="handleLoginShow"
              @mouseleave="handleLoginDis"
            >
              <p>- 登录后可专享 -</p>
              <div class="cards">
                <div class="card1">
                  <img src="../../assets/images/记录.png" alt="" />
                  <p>试听记录同步</p>
                </div>
                <div class="card1">
                  <img src="../../assets/images/铃铛.png" alt="" />
                  <p>订购炫酷铃音</p>
                </div>
                <div class="card1">
                  <img src="../../assets/images/无损音质.png" alt="" />
                  <p>下载无损音乐</p>
                </div>
              </div>
              <div class="but">
                <button class="but1" @click="login">登录</button>
                <button class="but2">注册</button>
              </div>
            </div>
            <!-- 已登录时的弹窗 -->
            <div
              class="loginPage logoutPage"
              v-show="showLogout"
              @mouseenter="handleLoginShow"
              @mouseleave="handleLoginDis"
            >
              <div class="message">
                <img :src="avatarUrl" class="msgImg" />
                <span class="msgName">
                  {{ nickname }}
                  <a class="iconfont icon-VIPICON"></a>
                  <a class="iconfont icon-cailing"></a>
                </span>
              </div>
              <div class="fourCube">
                <div><a class="iconfont icon-xihuan"></a>我喜欢的</div>
                <!-- <div><i class="iconfont icon-lingdang"></i>铃声设置</div> -->
                <div><a class="iconfont icon-zhuanji"></a>数字专辑</div>
                <div><a class="iconfont icon-yinle"></a>我的歌单</div>
              </div>
              <div class="but">
                <button class="but1" @click="logout">退出登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="black" v-show="mask">
      <form class="passLogin">
        <img class="img" src="../../assets/images/x.png" alt="" @click="cancleMask" />
        <div class="loginCon">
          <div class="loginWays">
            <p>短信登录</p>
            <p>密码登录</p>
            <p>SIM登录</p>
          </div>
          <div class="input">
            <input
              class="inp"
              type="text"
              v-model="phone"
              name=""
              id=""
              placeholder="手机号/邮箱/用户名"
            />
            <input
              class="inp"
              type="password"
              v-model="password"
              name=""
              id=""
              placeholder="密码"
            />
            <div class="autoLogin">
              <label><input type="checkbox" value="" checked />自动登录</label>
              <div class="passAndReg">
                <a>忘记密码 </a>
                <a href="">|</a>
                <a href="">注册</a>
              </div>
            </div>
          </div>
          <button class="log" @click="toLogin">登录</button>
          <p class="text">登录即同意<a>《咪咕用户服务协议》</a>和<a>《咪咕隐私权政策》</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reqSearchKeyWords } from "@api/header";

import { Message } from "element-ui";
import { mapState, mapActions } from "vuex";
import "./iconfont/iconfont.css";

export default {
  name: "Header",
  data() {
    return {
      showLogin: false,
      showLogout: false,
      mask: false,
      phone: "",
      password: "",
      keywords: ""
    };
  },
  computed: {
    ...mapState({
      nickname: state => state.login.nickname,
      avatarUrl: state => state.login.avatarUrl
    })
  },
  methods: {
    ...mapActions(["getLogin", "getLogout"]),
    // 点击跳转到个人中心页面
    toMy() {
      // 未登录
      if (this.showLogin) {
        Message.error("请先登录");
        return;
      }
      // 已登录
      if (this.showLogout) {
        this.$router.push("/my");
      }
    },
    // 登录
    async toLogin() {
      const { phone, password } = this;
      if (!phone || !password) {
        Message.error("用户名或密码不能为空");
        return;
      }
      console.log("登录");
      await this.getLogin({ phone, password });
      console.log("现在去跳转");
      this.$router.push("/my");
      this.mask = false;
    },
    // 鼠标移入请求登录
    handleLoginShow() {
      if (this.nickname) {
        this.showLogout = true;
        return;
      }
      this.showLogin = true;
    },
    // 鼠标移出
    handleLoginDis() {
      this.showLogin = false;
      this.showLogout = false;
    },
    login() {
      this.mask = true;
    },
    // 退出登录
    async logout() {
      this.phone = "";
      this.password = "";
      await this.getLogout();
      this.$router.push("/");
      this.showLogout = false;
    },
    cancleMask() {
      this.mask = false;
    },
    /* 搜索功能 */
    async searchKeywords() {
      const { keywords } = this;
      if (!keywords) return;
      const res = await reqSearchKeyWords(keywords);
      if (res.code === 200) {
        const songs = res.result.songs;
        console.log(songs);
        const playList = [];
        songs.forEach(item => {
          playList.push({
            id: item.id,
            song: item.name,
            /* 搜索返回只有默认图片  没有歌曲信息的图片*/
            picUrl: item.artists[0].img1v1Url,
            singer: item.artists[0].name,
            time: item.duration,
            album: item.album.name
          });
        });
        // console.log(playList);
        this.$store.commit("SEARCH_SONG", playList);
        this.$router.push({
          name: "play"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.border-bottom {
  border-bottom: 1px solid rgb(233, 233, 233);
}
.block {
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
}
.header {
  width: 1400px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: relative;

  .logo {
    margin-right: 50px;
  }
  .center {
    display: flex;
    justify-content: space-around;
    width: 492px;
    font-size: 16px;
    color: #999;
    .active {
      color: #e91e63;
    }
  }
  // 搜索
  .searchText {
    width: 300px;
    height: 40px;
    background-color: #f2f2f2;
    border-radius: 50px;
    border-style: none;
    margin-left: 350px;
    position: relative;
    .search {
      margin: 13px 0;
      padding-left: 16px;
      width: 230px;
      border-radius: 50px;
      background-color: #f2f2f2;
      outline: none;
      border: none;
      color: #999;
      font-size: 14px;
    }
    .iconfont {
      color: #999;
      display: inline-block;
      width: 25px;
      height: 25px;
      font-weight: 800;
      position: absolute;
      top: 12px;
      right: 10px;
    }
    .iconfont:hover {
      color: #e91e63;
      cursor: pointer;
    }
  }
  // 登录
  // .login {
  //   position: relative;
  // }
  .loginImg {
    position: absolute;
    top: 18px;
    right: 0;
  }
  .loginImg img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .loginPageCon {
    width: 360px;
    height: 200px;
  }
  .loginPage {
    width: 360px;
    height: 200px;
    background-color: #ffffff;
    box-shadow: 0px 0px 10px #ccc;
    position: absolute;
    top: 60px;
    right: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    p {
      padding-top: 20px;
    }
    .cards {
      width: 100%;
      height: 80px;
      // padding-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .card1 {
        width: 120px;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
    .but {
      width: 220px;
      height: 40px;
      margin: 20px 0;
      display: flex;
      justify-content: space-around;
      .but1 {
        width: 80px;
        background-color: #e91e63;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        color: #fff;
        outline: none;
      }
      .but2 {
        width: 80px;
        background-color: #dfdfdf;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        color: #666;
        outline: none;
      }
    }
  }
}
.black {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1000;
}
.passLogin {
  width: 410px;
  height: 410px;

  background-color: #fff;
  position: absolute;
  top: 50%;
  right: 50%;
  margin-top: -250px;
  margin-right: -250px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  .img {
    width: 20px;
    height: 20px;
    padding: 15px;
  }
  .loginCon {
    padding: 0 30px;
  }
  .loginWays {
    height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #999;
    p {
      font-size: 18px;
    }
    p:nth-of-type(2) {
      border-bottom: 2px solid #e91e63;
    }
  }
  .input {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    .inp {
      width: 328px;
      height: 23px;
      margin-top: 20px;
      padding: 10px;
      outline: none;
      border-radius: 5px;
      border: 1px solid #999;
      font-size: 14px;
    }
    .autoLogin {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      .passAndReg {
        a {
          color: #e30077;
          padding: 0 5px;
        }
      }
    }
  }
  .log {
    width: 350px;
    height: 44px;
    color: #fff;
    background-color: #dd0e53;
    border-radius: 5px;
    border: none;
    outline: none;
  }
  .log:hover {
    background-color: #ff1e69;
  }
  .text {
    font-size: 14px;
    padding-top: 30px;
    color: #999;
    a {
      color: #e91e63;
    }
  }
}
// 已登录后的弹窗
.loginPage.logoutPage {
  width: 490px;
  height: 320px;
}
// 弹窗上部
.message {
  width: 100%;
  padding-top: 20px;
  padding-left: 100px;
  display: flex;
  align-items: center;
}
// 头像
.message img.msgImg {
  width: 100px;
  height: 100px;
  border-radius: 50px;

  margin-right: 30px;
}
// 昵称
.message .msgName {
  font-size: 30px;
  font-weight: bolder;
}
// 昵称中的字体图标
.msgName .iconfont {
  font-size: 32px;
}
// 中间的四个小方块
.fourCube {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
.fourCube div {
  width: 94px;
  height: 94px;
  border-radius: 10px;
  line-height: 34px;
  font-size: 14px;
  text-align: center;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 15px;
}
// 小方块中的字体图标
.fourCube a {
  color: #e91e63;
  font-size: 30px;
}
</style>
