<template>
  <div>
    <div class="con">
      <div>
        <div class="drawDown" @click="showList">
          <p>咪咕尖叫榜</p>
        </div>
        <div class="item" v-show="showItemList">
          <p class="active">尖叫热歌榜</p>
          <p>尖叫热歌榜</p>
          <p>尖叫热歌榜</p>
        </div>
        <!-- <el-row class="tac">
          <el-col :span="12">
            <h5>自定义颜色</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row> -->
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
    </div>
    <FixedIcon />
    <Footer />
  </div>
</template>

<script>
// import { Dropdown } from "element-ui";
import FixedIcon from "../../components/FixedIcon/FixedIcon";
import Footer from "../../components/Footer/Footer";

export default {
  name: "Migulist",
  data() {
    return {
      showItemList: false,
    };
  },
  methods: {
    showList() {
      this.showItemList = !this.showItemList;
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
  },
  components: {
    FixedIcon,
    Footer,
  },
};
</script>

<style lang="less" scoped>
.con {
  width: 1400px;
  margin: 0 auto;
  position: relative;
}
.drawDown {
  width: 200px;
  height: 55px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  width: 200px;
  p {
    height: 46px;
    line-height: 46px;
    padding-left: 20px;
    font-size: 14px;
  }
  .active {
    color: #e91e63;
  }
}
.bigBox {
  height: 180px;
}
.songCon {
  width: 1160px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 230px;
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
</style>
