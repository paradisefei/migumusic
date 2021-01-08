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
          : 'http://m8.music.126.net/20210109000935/c3037be807b4cedba12547fe195f8230/ymusic/560b/525b/065a/aa95d15723e10e652b6410ab1c473a09.mp3',
        pic: songMsg
          ? songMsg.pic
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTRsSoJfs6bJ0Pu7YMHJzVVY-E93aHxuvwrg&usqp=CAU',
      }"
      @play="playMusic"
      @pause="pauseMusic"
    />
    <!-- 
      1.给audio元素绑定上这个play事件，这个事件是异步的，是在audio的pasued从true变为false时触发的
        未播放状态和暂停状态的值都是true
        是一个只读属性
     -->
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
      handler: function (newValue, oldValue) {
        // 监视到播放地址变化时就自动播放歌曲
        console.log("新的地址", newValue);
        console.log("旧的地址", oldValue);
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
         *  使用普通函数
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
       * 2.记住上一次的下标
       * 3.因为监视到了地址的变化，所以就播放了
       *  1.为什么地址会发生变化
       */
      console.log("我是暂停", this.$refs.player.audio.paused);
      this.$emit("togglePlayState", false);
      this.lastCheckedRowIndex = this.checkedRowIndexVuex;
      console.log("暂停之后保存上一次的下标", this.lastCheckedRowIndex);
      this.changeCheckedRowIndex(-1);
    },
    // 绑定的开始播放音乐的事件
    playMusic() {
      console.log("我是播放", this.$refs.player.audio.paused);
      this.$emit("togglePlayState", true);
      if (this.checkedRowIndexVuex === -1) {
        /**
         * 1.播放的时候，如果下标是-2的话，就说明是点击了暂停的，那就拿上次播放的那首歌的下标去渲染
         */
        console.log("暂停了之后再播放，上一次的播放行的下标为", this.lastCheckedRowIndex);
        this.changeCheckedRowIndex(this.lastCheckedRowIndex);
      } 
      if(this.checkedRowIndexVuex !== -1) {
        /**
         * 1.播放的时候如果被选中行不是-1，就说明是点击了播放图标去播放的
         */
        console.log("点击了播放图标的播放");
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
