<template>
  <div>
    <div class="con">
      <div class="lsitBox">
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#F8F8F8"
              text-color="#333"
              active-text-color="#ffd04b"
            >
              <el-submenu class="menuTitle" index="1">
                <template slot="title">
                  <span class="menuTitleText">咪咕尖叫榜</span>
                </template>
                <el-menu-item class="menuitem active" index="1-4"
                  >尖叫新歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫热歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫原创榜</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#F8F8F8"
              text-color="#333"
              active-text-color="#ffd04b"
            >
              <el-submenu class="menuTitle" index="1">
                <template slot="title">
                  <span class="menuTitleText">咪咕尖叫榜</span>
                </template>
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫新歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫热歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫原创榜</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#F8F8F8"
              text-color="#333"
              active-text-color="#ffd04b"
            >
              <el-submenu class="menuTitle" index="1">
                <template slot="title">
                  <span class="menuTitleText">咪咕尖叫榜</span>
                </template>
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫新歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫热歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫原创榜</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
        <el-row class="tac">
          <el-col :span="4">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#F8F8F8"
              text-color="#333"
              active-text-color="#ffd04b"
            >
              <el-submenu class="menuTitle" index="1">
                <template slot="title">
                  <span class="menuTitleText">咪咕尖叫榜</span>
                </template>
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫新歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫热歌榜</el-menu-item
                >
                <el-menu-item class="menuitem" index="1-4"
                  >尖叫原创榜</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="bigBox">
        <div class="songCon">
          <img class="bigImg" src="../../assets/logo.png" alt="" />
          <div class="rightCon">
            <div class="textCon">
              <h2>尖叫新歌榜</h2>
              <p>每小时更新</p>
            </div>
            <div class="iconBto">
              <div class="but1" href="">
                <span class="iconfont icon-bofang"></span>
                <span>播放选中歌曲</span>
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
</template>

<script>
import SongList from "../../components/SongList/index";

import { mapActions, mapState } from "vuex";
export default {
  name: "Migulist",
  data() {
    return {
      showItemList: false,
    };
  },
  computed: {
    ...mapState({
      newSongList: (state) => state.migulist.newSongList,
    }),
  },
  methods: {
    ...mapActions(["getNewSongList"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    this.getNewSongList();
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
}
.lsitBox {
  display: fixed;
}
.menuTitle {
  border-bottom: 1px solid #fff;
}
.menuTitleTextText {
  font-size: 16px;
}
.menuitem {
  height: 55px;
  padding-left: 20px;
  font-size: 14px;
  background-color: #ffffff;

  display: flex;
  justify-content: left;
  align-items: center;
}
.active {
  color: #e91e63;
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
  margin-left: 280px;
}
</style>
