<template>
  <div>
    <div class="footerCon">
      <div class="footer">
        <div class="miguMsg">
          <div class="con">
            <h6>咪咕文化</h6>
            <p>
              <a>咪咕文化网</a>
            </p>
            <p><a>咪咕音乐简介</a></p>
            <p><a>服务协议</a></p>
            <p><a>隐私权政策</a></p>
          </div>
          <div class="con">
            <h6>咪咕音乐家族</h6>
            <p><a>圈子彩铃</a></p>
          </div>
          <div class="con">
            <h6>联系我们</h6>
            <p><a>业务合作</a></p>
            <p><a>常见问题</a></p>
          </div>
          <div class="miGuCon">
            <h6>咪咕客户端</h6>
            <div class="imgCon">
              <div>
                <img
                  class="img"
                  src="../../assets/images/miguMusic.png"
                  alt=""
                />
                <p>咪咕音乐</p>
              </div>
              <div>
                <img
                  class="img"
                  src="../../assets/images/miguVideo.jpg"
                  alt=""
                />
                <p>咪咕视频</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img class="weibo" src="../../assets/images/weibo.png" alt="" />
        </div>
        <div class="copyRight">
          <span class="blankSpace">
            <a href="">蜀ICP备15012512号</a>
            <span>川网文[2019]2118-124</span>
            <span>网络视听许可证0112648号</span>
            <span>增值业务许可证A2.B1.B2-20100001 </span>
            <span>川公网安备 51010702002209号</span>
          </span>
          <span>Copyright © 2005-2021 咪咕音乐有限公司</span>
        </div>
      </div>
    </div>
    <!-- 右侧固定图标 -->
    <div class="fixIcon" ref="icons">
      <a href="#" class="iconBox" v-show="show">
        <span class="iconfont icon-fanhuidingbu"></span>
      </a>
      <div class="iconBox">
        <span class="iconfont icon-kefu icon"></span>
      </div>
      <router-link to="/play">
        <div class="iconBox">
          <span class="iconfont icon-bofang icon"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      // heights: 0,
      show: false,
    };
  },
  mounted() {
    // 获取页面的高度还有滚动条滚过的距离
    // 监视滚动条滚动的距离，并依据距离和页面高度比较
    // 屏幕高度
    // let topY = document.documentElement.clientHeight;
    window.onscroll = (e) => {
      // console.log(e);
      let pageY = e.path[1].pageYOffset;
      if (pageY > 500) {
        this.show = true;
      } else {
        this.show = false;
      }
    };
  },
};
</script>

<style lang="less" scoped>
.footerCon {
  background-color: #f3f3f3;
}
.footer {
  width: 1400px;
  margin: 100px auto 0;
  padding: 50px;
  .miguMsg {
    display: flex;
    position: relative;
    border-bottom: 1px solid #d4d4d4;
    .con {
      width: 350px;
      font-size: 12px;
      h6 {
        font-weight: 600;
        color: #333;
        padding-bottom: 30px;
      }
      p {
        color: #666;
        padding-bottom: 30px;
      }
      a:hover {
        color: #e91e63;
        cursor: pointer;
      }
    }
    .miGuCon {
      width: 240px;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      right: 0;
      h6 {
        font-size: 12px;
        margin-bottom: 30px;
      }
      .imgCon {
        display: flex;
        justify-content: space-between;
      }
      .img {
        widows: 100px;
        height: 100px;
        margin-bottom: 20px;
      }
    }
  }
  .weibo {
    width: 24px;
    height: 24px;
  }
  .copyRight {
    font-size: 12px;
    color: #666;
    display: flex;
    justify-content: space-between;
    .blankSpace span {
      display: inline-block;
      padding-left: 10px;
    }
  }
  a:hover {
    text-decoration: none;
  }
}
// 固定图标
html {
  position: relative;
}

.fixIcon {
  position: fixed;
  bottom: 50px;
  right: 100px;
  width: 54px;
  height: 164px;

  .iconBox {
    width: 100%;
    height: 54px;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fff;
    .iconfont {
      font-size: 30px;
      color: #fff;
    }
    .icon:hover {
      color: #e91e63;
    }
  }
}
</style>
