<template>
  <div class="fixIcon" ref="icons">
    <a href="#" class="iconBox" v-show="show">
      <span class="iconfont icon-fanhuidingbu"></span>
    </a>
    <div class="iconBox">
      <span class="iconfont icon-kefu icon"></span>
    </div>
    <router-link to="/play">
      <div class="iconBox">aaa
        <span class="iconfont icon-bofang1 icon">qq</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FixedIcon",
  data() {
    return {
      // heights: 0,
      show: false,
    };
  },
  watch: {},
  mounted() {
    // 获取页面的高度还有滚动条滚过的距离
    // 监视滚动条滚动的距离，并依据距离和页面高度比较
    // 屏幕高度
    // let topY = document.documentElement.clientHeight;
    window.onscroll = (e) => {
      console.log(e);
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
