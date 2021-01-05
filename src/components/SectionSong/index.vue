<template>
  <div>
    <div class="sectionsong-container w">
      <div class="home-recommend-title">
        <h2>{{ h2Title }}</h2>
        <div class="home-recommend-more">
          <a href="#"
            >更多
            <i class="iconfont icon-more"></i>
          </a>
        </div>
      </div>
      <div class="sectionsong-container-bottom">
        <div class="inner-item">
          <div class="inner-item-container">
            <img src="@static/images/home/ia_100000024.jpg" alt="" />
            <p class="album-name">我这么脆弱的人</p>
            <p class="singer-name">王加一</p>
          </div>
        </div>
        <div class="inner-item">
          <div class="inner-item-container">
            <img src="@static/images/home/ia_100000024.jpg" alt="" />
            <p class="album-name">我这么脆弱的人</p>
            <p class="singer-name">王加一</p>
          </div>
        </div>
        <div class="inner-item">
          <div class="inner-item-container">
            <img src="@static/images/home/ia_100000024.jpg" alt="" />
            <p class="album-name">我这么脆弱的人</p>
            <p class="singer-name">王加一</p>
          </div>
        </div>
        <div class="inner-item">
          <div class="inner-item-container">
            <img src="@static/images/home/ia_100000024.jpg" alt="" />
            <p class="album-name">我这么脆弱的人</p>
            <p class="singer-name">王加一</p>
          </div>
        </div>
        <div class="inner-item">
          <div class="inner-item-container">
            <img src="@static/images/home/ia_100000024.jpg" alt="" />
            <p class="album-name">我这么脆弱的人</p>
            <p class="singer-name">王加一</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionSong",
  props: {
    h2Title: {
      type: String,
      default: "标题"
    }
  }
};
</script>

<style lang="less" scoped>
.w {
  width: 1400px;
  height: 100%;
  margin: 0 auto;
}
a {
  color: #999;
  font-size: 14px;
  &:hover {
    color: #fd3f7f;
    transition: all 0.5s;
  }
}
.sectionsong-container {
  margin-top: 80px;
}
.home-recommend-title {
  height: 62px;

  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 24px;
    color: #333;
  }
}
.sectionsong-container-bottom {
  display: flex;
  flex-wrap: wrap;
  .inner-item {
    width: 20%;
    height: 50%;

    .inner-item-container {
      margin: 0 21px;
      height: 288px;

      font-size: 14px;
      display: flex;
      flex-direction: column;
      background: url("../../static/images/home/ia_100000181.png") no-repeat 22px 0;
      img {
        height: 216px;
        width: 216px;
      }
      p {
        margin-top: 14px;
      }
      .album-name {
        color: #333;
      }
      .singer-name {
        color: #999;
      }
    }
  }
}
</style>
