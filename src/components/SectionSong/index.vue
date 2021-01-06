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
        <div
          class="inner-item"
          v-for="(song, index) in songList"
          :key="song.id"
          @mouseenter="hoverBigImg(index)"
          @mouseleave="leaveBigImg(index)"
        >
          <img
            class="container-right-item-showImg"
            src="@static/images/home/ia_100000166.png"
            alt=""
            v-show="song.isPlayShow"
          />
          <div class="inner-item-container">
            <img :src="song.picUrl" alt="" />
            <p class="album-name">{{ song.name }}</p>
            <p class="singer-name">{{ song.singer ? song.singer : "网易云咪咕" }}</p>
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
    h2Title: String,
    songList: Array
  },
  methods: {
    hoverBigImg(index) {
      this.$set(this.songList[index], "isPlayShow", true);
    },
    leaveBigImg(index) {
      this.$set(this.songList[index], "isPlayShow", false);
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
    position: relative;
    .container-right-item-showImg {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 33%;
      top: 50%-25px;
    }
    .inner-item-container {
      margin: 0 21px;
      height: 288px;

      font-size: 14px;
      display: flex;
      flex-direction: column;
      background: url("../../static/images/home/ia_100000181.png") no-repeat 22px 0;
      img {
        cursor: pointer;
        height: 216px;
        width: 216px;
        border-radius: 10px;
      }
      p {
        margin: 7px 0;
      }
      .album-name {
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .singer-name {
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
