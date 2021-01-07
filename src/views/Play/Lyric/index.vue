<template>
  <div class="outer">
    <div class="inner">
      <div class="inner-img">
        <img v-if="!songLyric" src="./ia_100000011534.png" />
        <img v-else :src="songMsg.pic" alt="" />
      </div>
      <div class="inner-container">
        <div class="inner-container-title">
          <p>歌曲名:{{ songMsg ? songMsg.song : "歌曲" }}</p>
          <p>歌手名:{{ songMsg ? songMsg.singer : "歌手" }}</p>
        </div>
        <div class="inner-container-scorll">
          <el-scrollbar class="scroll">
            <!-- :class="['lyric-item', { active: activeIndex === index }]" -->
            <div
              v-for="(item, index) in songLyricArray"
              :key="index"
              @click="lyricClick(item)"
            >
              {{ item.content }}
            </div>
            <div v-show="!songLyricArray">暂无歌词</div>
            <!-- <div>{{ songLyric }}</div> -->
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 1.歌词
 *  1.处理歌词
 *  2.显示歌词
 */
export default {
  name: "Lyric",
  props: {
    songMsg: {
      type: Object,
      default: function () {
        return {};
      },
    },
    songLyric: {
      type: String,
    },
  },
  watch: {
    // songLyric: {
    //   immediate: true,
    //   handler: function (newValue) {
    //     const strIfy = JSON.stringify(newValue);
    //     let arrSplit = newValue.split("\n");
    //     let timeReg = /^\[.*\]/;
    //     let arrLyric = [];
    //     arrSplit.forEach((item) => {
    //       if (!item) return;
    //       console.log("每一行", item);
    //       let time = item.match(timeReg)[0].substr(1, 9);
    //       let minute = time.substr(0, 2);
    //       let second = time.substr(3, 2);
    //       let ms = time.substr(6, 2);
    //       arrLyric.push({
    //         time,
    //         ms:
    //           parseInt(minute) * 60 * 1000 +
    //           parseInt(second) * 1000 +
    //           parseInt(ms) * 10,
    //         content: item.substr(11),
    //       });
    //     });
    //     console.log("arrSplit", arrSplit);
    //     console.log("strIfy", strIfy);
    //     console.log("arrLyric", arrLyric);
    //   },
    // },
  },
  computed: {
    songLyricArray() {
      /**
       * 1.歌词成功显示
       * 2.拿到歌词出来显示的时候已经就是没有\n的了
       */
      if (!this.songLyric) return;
      if(this.songLyric === "暂无歌词") {
        return "";
      }
      const strIfy = JSON.stringify(this.songLyric);
      let arrSplit = this.songLyric.split("\n");
      let timeReg = /^\[.*\]/;
      let arrLyric = [];
      arrSplit.forEach((item) => {
        if (!item) return;
        console.log("每一行", item);
        let time = item.match(timeReg)[0].substr(1, 9);
        let minute = time.substr(0, 2);
        let second = time.substr(3, 2);
        let ms = time.substr(6, 2);
        arrLyric.push({
          time,
          ms:
            parseInt(minute) * 60 * 1000 +
            parseInt(second) * 1000 +
            parseInt(ms) * 10,
          content: item.substr(11),
        });
      });
      console.log("arrSplit", arrSplit);
      console.log("strIfy", strIfy);
      console.log("arrLyric", arrLyric);
      return arrLyric;
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: calc(100vw - 100px - 140px - 1130px);
  min-width: 300px;
  // background: brown;
  height: calc(100vh - 110px - 100px);
  min-height: 200px;
  position: fixed;
  right: 40px;
  top: 70px;
  z-index: 999;
  min-height: 300px;
}
.inner {
  position: relative;
  width: 240px;
  height: 100%;
  // background: gold;
  margin: 0 auto;

  .inner-img {
    width: 200px;
    height: 200px;
    img {
      padding: 0 20px;
      width: 200px;
      height: 200px;
    }
  }
  .inner-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 100px;
    margin: auto;
    margin-top: 200px;
    // background: yellowgreen;
    .inner-container-title {
      text-align: center;
      color: #999;

      font-size: 14px;
      p {
        height: 30px;
        line-height: 30px;
      }
    }
    .inner-container-scorll {
      text-align: center;
      // background: turquoise;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      min-height: 10px;
      margin: auto;
      margin-top: 60px;
      overflow: hidden;

      &:hover {
        cursor: move;
      }
      .scroll {
        height: 100%;
        width: 100%;
        color: #999;
      }
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
      /deep/ .el-select-dropdown .el-scrollbar {
        padding-bottom: 17px;
      }
      /deep/ .el-scrollbar__thumb {
        display: none;
      }
    }
  }
}
</style>
