<template>
  <div class="bottom">
    <!-- 使用字体图标 -->
    <!-- <div class="control">
      <i class="iconfont icon-music-controller-play-prev"></i>
      <i
        :class="{
          iconfont: true,
          'icon-music-controller-start-play': !isPlaying,
          'icon-music-controller-pause-play': isPlaying,
        }"
        @click="togglePlayState"
      ></i>
      <i class="iconfont icon-music-controller-play-next"></i>
    </div>
    <div class="msgAndProgress">
      <div class="msg">
        <span class="name">{{ songMsg.song }} - {{ songMsg.singer }}</span>
        <span class="time"
          >00:03/{{ dayjs(songMsg.time).format("mm:ss") }}</span
        >
      </div>
      <div class="progress">
        <div class="played">
          <div class="ball"></div>
        </div>
      </div>
    </div> -->
    <!-- 
      1.加上autoplay属性会有效，但在改变了什么之后又会变得无效
      2.加载完了之后再给这个元素加上一个autoplay属性
     -->
    <!-- <button @click="playBtn">播放</button>
    <button @click="pauseBtn">暂停</button> -->
    <aplayer
      v-if="isShow"
      ref="player"
      autoplay
      :music="{
        title: songMsg ? songMsg.song + ' - ' : 'hello',
        artist: songMsg ? songMsg.singer: 'world',
        src: songUrl
          ? songUrl
          : 'http://m7.music.126.net/20210107094952/dae12f1b62673352b840e9846b8dfd07/ymusic/7245/c7bb/b078/81c1e81d3b5fed50ca6d51196fc59ad6.mp3',
        pic: songMsg
          ? songMsg.pic
          : 'http://p4.music.126.net/ag6iowagVFQDR7WeERp9jg==/109951164882560642.jpg',
      }"
    />
  </div>
</template>

<script>
import APlayer from "vue-aplayer";
import dayjs from "dayjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "MusicControl",
  data() {
    return {
      isShow: true,
      dayjs: dayjs,
      // 定义变量表示播放状态
      isPlaying: true,
    };
  },
  props: {
    songMsg: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      songUrl: (state) => state.play.songUrl,
    }),
  },
  watch: {
    songUrl: {
      immediate: true,
      handler: function (newValue) {
        // 监视到播放地址变化时就自动播放歌曲
        console.log("新的地址", newValue);
      },
    },
    // 监视songMsg对象的变化
    songMsg: {
      immediate: true,
      deep: true,
      handler: async function (newValue) {
        /**
         * 1.把歌曲的基本信息渲染在页面上
         * 2.发送请求，拿到歌曲的播放地址
         * 3.监视属性中拿不到实例对象
         */
        // console.log(newValue, this);
        if (!this || !newValue) return;
        await this.getSongUrl(newValue.id);
        this.$refs.player.play();
      },
    },
  },
  methods: {
    ...mapActions(["getSongUrl"]),
    // 暂停播放
    // pauseBtn() {
    //   this.$refs.player.pause();
    // },
    // // 播放歌曲
    // playBtn() {
    //   this.$refs.player.play();
    // },
    // 切换播放状态
    togglePlayState() {
      this.isPlaying = !this.isPlaying;
    },
  },
  components: {
    aplayer: APlayer,
  },
  mounted() {
    // 使用nextTick解决aplayer无法自动播放的问题
    // this.$nextTick(() => {
    //   this.isShow = !!this.isShow;
    // });
    // 自动播放
    // this.$refs.player.play();
    console.log("挂载MusicControl组件");
    if (!this.songMsg) return;
    this.getSongUrl(this.songMsg.id);
  },
  beforeDestroy() {
    /**
     * 离开时将歌曲暂停
     */
    this.$refs.player.pause();
  }
};
</script>

<style lang="less" scoped>
// 播放器组件自定义样式
.aplayer {
  width: 1130px;
  height: 100px;
}
/deep/.aplayer-pic {
  width: 100px;
  height: 100px;
}
// 已播放条的颜色
/deep/.aplayer-played{
  background: #e91e63;
}
// 底部播放控制
.bottom {
  width: 1130px;
  height: 110px;
  padding-top: 20px;
  margin-left: 70px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: absolute;
  bottom: 20px;
}
.bottom .control {
  width: 280px;
  height: 100%;
  color: white;
  // background: yellow;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
// 控制条中的字体图标
.bottom .control .iconfont {
  font-size: 32px;
  cursor: pointer;
}
// 右边的进度条
.msgAndProgress {
  height: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}
.bottom .progress {
  width: 760px;
  height: 4px;
  background: #848484;
}
// 歌曲信息
.bottom .msg {
  color: #cbcbcb;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
// 歌曲名
.bottom .msg .name {
  font-size: 16px;
}
// 已播放
.bottom .progress .played {
  width: 10%;
  height: 100%;
  background: white;
}
// 播放球
.bottom .progress .played .ball {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  position: relative;
  top: -4px;
  left: 100%;
}
</style>
