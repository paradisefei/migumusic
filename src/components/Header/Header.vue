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
          />
          <span class="iconfont icon-search"></span>
        </div>
        <div class="login">
          <div
            class="loginImg"
            @mouseenter="handleLoginShow"
            @mouseleave="handleLoginDis"
          >
            <a>
              <img src="../../assets/images/no-login.png" alt="" />
            </a>
          </div>
          <div class="loginPageCon">
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
          </div>
        </div>
      </div>
    </div>
    <div class="black" v-show="mask">
      <form class="passLogin">
        <img
          class="img"
          src="../../assets/images/x.png"
          alt=""
          @click="cancleMask"
        />
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
              name=""
              id=""
              placeholder="手机号/邮箱/用户名"
            />
            <input
              class="inp"
              type="password"
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
          <button class="log">登录</button>
          <p class="text">
            登录即同意<a>《咪咕用户服务协议》</a>和<a>《咪咕隐私权政策》</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showLogin: false,
      mask: false,
    };
  },
  methods: {
    handleLoginShow() {
      this.showLogin = true;
    },
    handleLoginDis() {
      this.showLogin = false;
    },
    login() {
      this.mask = true;
    },
    cancleMask() {
      this.mask = false;
    },
  },
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
      padding-left: 13px;
      width: 230px;
      border-radius: 50px;
      background-color: #f2f2f2;
      outline: none;
      border: none;
    }
    .iconfont {
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
  login {
    position: relative;
  }
  .loginImg {
    position: absolute;
    top: 18px;
    right: 0;
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
</style>
