<template>
  <div class="border-bottom">
    <div class="header">
      <div>
        <ul class="center" @click="changeColor">
          <li>
            <router-link to="/" :class="isShowHome ? 'active' : ''" data-type="首页"
              >首页
            </router-link>
          </li>
          <li data-type="歌单">歌单</li>
          <li data-type="专辑">专辑</li>
          <li>
            <router-link to="/migulist" data-type="榜单" :class="isShowTop ? 'active' : ''"
              >榜单</router-link
            >
          </li>
          <li>
            <router-link to="/artlist" data-type="歌手" :class="isShowSinger ? 'active' : ''"
              >歌手</router-link
            >
          </li>
          <li data-type="彩铃">彩铃</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isShowHome: true,
      isShowTop: false,
      isShowSinger: false
    };
  },
  methods: {
    /* 切换 */
    changeColor(e) {
      const type = e.target.getAttribute("data-type");
      if (type === "首页") {
        this.isShowHome = true;
        this.isShowTop = false;
        this.isShowSinger = false;
      }
      if (type === "榜单") {
        this.isShowHome = false;
        this.isShowTop = true;
        this.isShowSinger = false;
      }
      if (type === "歌手") {
        this.isShowHome = false;
        this.isShowTop = false;
        this.isShowSinger = true;
      }
      if (type === "歌单" || type === "专辑" || type === "彩铃") {
        this.$notify({
          title: "该功能还未开发呢~",

          duration: 2000,
          type: "warning"
        });
      }
    }
    // 提示
  }
};
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid rgb(233, 233, 233);
  box-shadow: 2px 4px 8px #f2f2f2;
}
.header {
  width: 1400px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: relative;
  .center {
    display: flex;
    justify-content: space-around;
    width: 492px;
    font-size: 14px;
    margin-left: 138px;
    li {
      cursor: pointer;
    }
    .active {
      color: #e91e63;
    }
  }
}
</style>
