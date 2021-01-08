<template>
  <div>
    <div class="con">
      <div class="listBox">
        <el-row class="tac">
          <el-menu
            background-color="#F8F8F8"
            text-color="#333"
            active-text-color="#e91e63"
            popper-append-to-body="true"
          >
            <el-submenu class="menuTitle" index="1">
              <template slot="title">
                <span class="menuTitleText">咪咕尖叫榜</span>
              </template>
              <el-menu-item index="1-1">尖叫新歌榜</el-menu-item>
              <el-menu-item index="1-2">尖叫热歌榜</el-menu-item>
              <el-menu-item index="1-3">尖叫原创榜</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
        <el-row class="tac">
          <el-menu
            background-color="#F8F8F8"
            text-color="#333"
            active-text-color="#e91e63"
            popper-append-to-body="true"
          >
            <el-submenu class="menuTitle" index="1">
              <template slot="title">
                <span class="menuTitleText">咪咕尖叫榜</span>
              </template>
              <el-menu-item index="1-1">尖叫新歌榜</el-menu-item>
              <el-menu-item index="1-2">尖叫热歌榜</el-menu-item>
              <el-menu-item index="1-3">尖叫原创榜</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
        <el-row class="tac">
          <el-menu
            background-color="#F8F8F8"
            text-color="#333"
            active-text-color="#e91e63"
            popper-append-to-body="true"
          >
            <el-submenu class="menuTitle" index="1">
              <template slot="title">
                <span class="menuTitleText">咪咕尖叫榜</span>
              </template>
              <el-menu-item index="1-1">尖叫新歌榜</el-menu-item>
              <el-menu-item index="1-2">尖叫热歌榜</el-menu-item>
              <el-menu-item index="1-3">尖叫原创榜</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-row>
      </div>
      <div class="rightBox">
        <div class="bigBox">
          <div class="songCon">
            <img class="bigImg" src="../../assets/images/newSong.png" alt="" />
            <div class="rightCon">
              <div class="textCon">
                <h2>尖叫新歌榜</h2>
                <p>每小时更新</p>
              </div>
              <div class="iconBto">
                <div class="but1" href="">
                  <span class="iconfont icon-bofang"></span>
                  <span @click="getSongMsg()">播放选中歌曲</span>
                </div>
                <div class="but2" href="">
                  <img
                    class="plus"
                    src="../../assets/images/添加到看板-01.png"
                    alt=""
                  />
                  <span>添加到</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="songlist">
          <SongList :songList="newSongList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from "../../components/SongList/index";

import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Migulist",
  data() {
    return {
      showItemList: false,
      songMsg: [],
    };
  },
  computed: {
    ...mapState({
      newSongList: (state) => state.migulist.newSongList,
      // 把放歌曲的容器映射到计算属性中
      // songListCon: (state) => state.play.songListCon,
    }),
  },
  methods: {
    ...mapActions(["getNewSongList"]),
    ...mapMutations(["ONE_SONG", "ALL_SONG"]),
    // 保存点击时获取的歌曲信息

    // song(e) {
    //   // 当点击全选时，直接把所有数据传给播放函数
    //   /* 
    //     需要的数据格式：
    //     id: message.id,
    //     pic: message.al.picUrl,
    //     singer: message.ar[0].name,
    //     song: message.name,
    //     album: message.al.name,
    //     time: message.dt
    //   */
    //   console.log("e----", e);
    //   this.songMsg = {
    //     id: e[0].id,
    //     pic: e.pic,
    //     singer: e.singer,
    //     album: e.album,
    //     time: e.time,
    //   };
    //   // this.songListCon = this.songMsg;
    //   console.log(this.songMsg);
    //   let res = this.isPlayingList.push(this.songMsg);
    //   console.log("res", res);
    // },
    async getSongMsg() {
      /* 
       1.要播放选中的歌曲，首先要知道选中的歌曲时那个，可以通过row可以知道哪个具体被选中了
       2.点击前面的复选框时，可以获取到当前选中的所有的信息，
       3.选中时，需要把选择的歌曲传递到 isPlayingList 这个vuex中，
       选中时，把信息传递过来，就可以调用vuex中方法播放歌曲
      */
   
      this.$router.push("play");
    },
  },
  mounted() {
    this.getNewSongList();
    // this.$nextTick(() => {
    //   this.$bus.$on("song", this.song);
    // });
  },
  components: {
    SongList,
  },
};
</script>

<style lang="less" scoped>
.con {
  width: 1400px;
  margin: 30px auto 0;
  position: relative;
  display: flex;
}
.listBox {
  display: fixed;
  width: 250px;
  /deep/.el-submenu__title {
    font-size: 16px;
  }
}

.rightBox {
  width: 1160px;
}
.songCon {
  width: 1160px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 280px;
  .bigImg {
    width: 180px;
    height: 180px;
    margin-right: 30px;
    background-image: url("../../assets/images/bg.jpg");
  }
  .rightCon {
    width: 942px;
    position: absolute;
    top: 0;
    left: 200px;
    .textCon {
      width: 100%;
      height: 73px;
      h2 {
        font-size: 28px;
      }
      p {
        padding-top: 10px;
        font-size: 16px;
      }
    }
    .iconBto {
      width: 312px;
      height: 38px;
      display: flex;
      position: absolute;
      top: 150px;
      left: 0px;
      cursor: pointer;
      .but1 {
        width: 143px;
        height: 100%;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        background-color: #e91e63;
        margin-right: 30px;
        color: #fff;
      }
      .but2 {
        width: 134px;
        height: 100%;
        line-height: 38px;
        text-align: center;
        border: 1px solid #999;
        border-radius: 20px;
        .plus {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }
  }
}
.songlist {
  margin-top: 220px;
}
</style>
