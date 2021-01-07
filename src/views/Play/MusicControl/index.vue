<template>
  <div class="bottom">
    <aplayer
      v-if="isShow"
      ref="player"
      autoplay
      :music="{
        title: songMsg ? songMsg.song + ' - ' : 'hello',
        artist: songMsg ? songMsg.singer : 'world',
        src: songUrl
          ? songUrl
          : 'http://m7.music.126.net/20210107094952/dae12f1b62673352b840e9846b8dfd07/ymusic/7245/c7bb/b078/81c1e81d3b5fed50ca6d51196fc59ad6.mp3',
        pic: songMsg
          ? songMsg.pic
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTRsSoJfs6bJ0Pu7YMHJzVVY-E93aHxuvwrg&usqp=CAU',
      }"
      @play="playMusic"
      @pause="pauseMusic"
    />
  </div>
</template>

<script>
/**
 * 1.暂停播放
 * 2.请求歌词
 *  1.把歌词文件放在vuex中
 * 3.把audio对象传到父组件中
 */
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
      // 记录上一次播放行的下标
      lastCheckedRowIndex: -1,
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
      isPlayingList: (state) => state.play.isPlayingList,
      checkedRowIndexVuex: (state) => state.play.checkedRowIndexVuex,
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
    ...mapActions(["getSongUrl", "changeCheckedRowIndex", "getSongLyric"]),
    // 
    timePlayed(time) {
      console.log(this.dayjs(time.timeStamp).format("mm:ss.SSS"));
    },
    // 暂停播放
    pauseMusic() {
      /**
       * 1.暂停播放时，没有播放行，所以需要改变播放行的下标
       * 2.记住上一次的下标，但这一次的下标
       */
      this.$emit("togglePlayState", false);
      this.lastCheckedRowIndex = this.checkedRowIndexVuex;
      this.changeCheckedRowIndex(-1);
    },
    // 绑定的开始播放音乐的事件
    playMusic() {
      this.$emit("togglePlayState", true);
      if (this.checkedRowIndexVuex === -1) {
        this.changeCheckedRowIndex(this.lastCheckedRowIndex);
      } 
      if(this.checkedRowIndexVuex > -1) {
        this.changeCheckedRowIndex(this.checkedRowIndexVuex);
      }
    },

    // 切换播放状态
    togglePlayState() {
      this.isPlaying = !this.isPlaying;
    }
  },
  components: {
    aplayer: APlayer
  },
  async mounted() {
    /**
     * 1.挂载成功把audio对象传到父组件
     */
    this.$emit("getAudioElement", this.$refs.player);
    console.log("挂载MusicControl组件", this.songMsg);
    if (!this.songMsg) return;
    /**
     * 1.获取歌曲的url
     * 2.获取歌曲的歌词
     */
    console.log(this.songMsg.id);
    await this.getSongUrl(this.songMsg.id);
    await this.getSongLyric(this.songMsg.id);
  },
  beforeDestroy() {
    /**
     * 离开时将歌曲暂停
     */
    console.log(12122);
    this.$refs.player.pause();
  },
};
</script>

<style lang="less" scoped>
// 播放器组件自定义样式
// .aplayer {
//   width: 1330px;
//   height: 100px;
// }
/deep/.aplayer-pic {
  width: 100px;
  height: 100px;
}
// 已播放条的颜色
/deep/.aplayer-played {
  background: #e91e63;
}
// 底部播放控制
.bottom {
  width: 1400px;
  height: 110px;
  margin-left: 50px;

  position: absolute;
  bottom: 40px;
}
</style>
