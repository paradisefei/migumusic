<template>
  <div class="outer">
    <div class="inner">
      <div class="inner-img">
        <img v-if="!songLyric" src="./nopic.png" />
        <img v-else :src="songMsg.pic" alt="" />
      </div>
      <div class="inner-container">
        <div class="inner-container-title">
          <p>歌曲名:{{ songMsg ? songMsg.song : "歌曲" }}</p>
          <p>歌手名:{{ songMsg ? songMsg.singer : "歌手" }}</p>
        </div>
        <div class="inner-container-scorll">
          <!-- <el-scrollbar class="scroll"> -->
          <!-- :class="['lyric-item', { active: activeIndex === index }]" -->
          <!-- <div
              v-for="(item, index) in songLyricArray"
              :key="index"
              @click="lyricClick(item)"
            >
              {{ item.content }}
            </div>
            <div v-show="!songLyricArray">暂无歌词</div> -->
          <!-- <div>{{ songLyric }}</div> -->
          <div class="lyric">
            <div class="lyric-content" ref="lyric">
              <div class="lyric-item-wrapper">
                <!-- 每一行的换行问题 -->
                <div
                  :class="['lyric-item', { active: activeIndex === index }]"
                  v-for="(item, index) in songLyricArray"
                  :key="index"
                >
                  {{ item.content }}
                </div>
                <div
                  v-show="!songLyricArray"
                  style="color: white; font-size: 14px"
                >
                  暂无歌词
                </div>
              </div>
            </div>
          </div>
          <!-- </el-scrollbar> -->
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
 * 2.歌词滚动
 *  audio和歌词在两个不同的组件，想办法把audio对象在这个组件拿到
 * 3.现在已经确定好了哪一行高亮了
 */
// import dayjs from "dayjs";
import BScroll from "better-scroll";
export default {
  name: "Lyric",
  data() {
    return {
      scroll: null,
      activeIndex: 0,
    };
  },
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
    audioElement: {
      type: Object,
    },
  },
  watch: {
    // 监视activeIndex的变化
    activeIndex: {
      immediate: true,
      handler: function () {
        /**
         * 1.有个问题是，每次变完了之后又跳回到了顶部位置
         * 2.每次跳都是从0开始跳
         */
        if (!this.scroll) return;
        // this.scroll.scrollFrom(0, -27 * this.activeIndex + 53);
        this.scroll.scrollTo(0, -27 * this.activeIndex + 54, 500);
        this.scroll.refresh();
      },
    },
    // audioElement: {
    //   immediate: true,
    //   handler: function(newValue) {
    //     console.log(newValue);
    //   }
    // }
    songLyric: {
      immediate: true,
      handler: function () {
        /**
         * 1.拿到对象来绑定事件
         */
        // console.log(this.audioElement);
        this.init();
        // this.lyricScrollInit();
      },
    },
  },
  methods: {
    init() {
      // console.log(this.audioElement);
      if (!this.audioElement) return;
      if (!this.songLyricArray) return;
      // console.log(this.audioElement);
      this.audioElement.$refs.audio.addEventListener("timeupdate", (e) => {
        let timeStamp = e.target.currentTime * 1000;
        // console.log(timeStamp);
        // let timeStampFormat = dayjs(timeStamp).format("mm:ss")
        // console.log(timeStampFormat);
        this.activeIndex = this.songLyricArray.findIndex((item, index) => {
          /**
           * 1.找到需要被高亮的那一行
           *  1.这个没问题
           *  2.现在就是要去让高亮的显示出来
          //  */
          // console.log("item", item);
          // console.log("item.ms", item.ms);
          // console.log("timeStamp", timeStamp);
          return item.ms < timeStamp && this.songLyricArray[index + 1]
            ? this.songLyricArray[index + 1].ms > timeStamp
            : true;
        });
        console.log(this.activeIndex);
      });
    },
    lyricScrollInit() {
      this.scroll = new BScroll(this.$refs.lyric);
      this.scroll.scrollTo(0, 54);
      this.scroll.refresh();
    },
  },
  computed: {
    songLyricArray() {
      /**
       * 1.歌词成功显示
       * 2.拿到歌词出来显示的时候已经就是没有\n的了
       */
      if (!this.songLyric) return;
      if (this.songLyric === "暂无歌词") {
        return "";
      }
      // const strIfy = JSON.stringify(this.songLyric);
      let arrSplit = this.songLyric.split("\n");
      let timeReg = /^\[.*\]/;
      let arrLyric = [];
      arrSplit.forEach((item) => {
        if (!item) return;
        let time = item.match(timeReg)[0].slice(1, -1);
        let minute = time.slice(0, 2);
        let second = time.slice(3, 5);
        let ms = time.slice(6);
        // console.log("time", time);
        // console.log("minute", minute);
        // console.log("second", second);
        // console.log("ms", ms);
        // console.log(
        //   parseInt(minute) * 60 * 1000 +
        //     parseInt(second) * 1000 +
        //     parseInt(ms) * 10
        // );
        arrLyric.push({
          time,
          ms:
            parseInt(minute) * 60 * 1000 +
            parseInt(second) * 1000 +
            parseInt(ms) * 10,
          content: item.substr(11),
        });
      });
      return arrLyric;
    },
  },
  mounted() {
    /**
     * 1.只执行一次mounted
     */
    this.lyricScrollInit();
    this.init();
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
    border-radius: 20px;
    img {
      padding: 0 20px;
      width: 200px;
      height: 200px;
      border-radius: 25px;
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
.lyric {
  .lyric-content {
    position: relative;
    // height: 108px;
    height: calc(100vh - 110px - 100px);
    overflow: hidden;
    background: transparent;
    border-radius: 8px;
    user-select: none;
    .lyric-item-wrapper {
      .lyric-item {
        color: #999;
        // height: 27px;
        height: auto;
        transition: all 1s;
        cursor: pointer;
        padding-left: 1em;
        margin: 10px 0;
        white-space: wrap;
        &.active {
          color: white;
        }
      }
    }
    .play-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #999;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
