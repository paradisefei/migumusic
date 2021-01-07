<template>
  <div class="play_container">
    <div class="header">
      <router-link to="/"><img src="./images/logo.png" class="logo"/></router-link>
      <img src="./images/uniaccess.png" class="avatar" @click="toMy" />
    </div>
    <div class="center_container">
      <ul class="left">
        <li class="active">
          <a>默认播放列表</a>
        </li>
        <li>
          <a>喜欢的音乐</a>
        </li>
      </ul>
      <div class="center">
        <div class="twoButtom">
          <a class="tb play activeBtn">
            <i class="iconfont icon-bofang"></i>
            添加到歌单
          </a>
          <a class="tb add">
            <i class="iconfont icon-lajitong"></i>
            删除
          </a>
        </div>

        <el-scrollbar class="scrollbar">
          <el-table
            ref="multipleTable"
            :data="isPlayingList"
            tooltip-effect="dark"
            style="width: 100%; background: transparent"
            :row-style="{ height: '80px' }"
            fit
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column type="index" width="50">
              <template slot-scope="scope">
                <span v-if="checkedRowIndexVuex != scope.$index">
                  <a
                    class="iconfont icon-bofang"
                    v-if="!scope.row.showPlay"
                    @mouseleave="scope.row.showPlay = true"
                    @click="playAudio(scope.$index, scope.row)"
                  ></a>
                  <a v-else @mouseenter="scope.row.showPlay = false">{{ scope.$index + 1 }}</a>
                </span>
                <img v-else src="./images/playing.gif" /> </template
            ></el-table-column>
            <el-table-column label="歌曲">
              <template slot-scope="scope"
                ><a>{{ scope.row.song }}</a></template
              >
            </el-table-column>
            <el-table-column prop="name" label="歌手">
              <template slot-scope="scope"
                ><a>{{ scope.row.singer }}</a></template
              ></el-table-column
            >
            <el-table-column prop="address" label="时长" show-overflow-tooltip>
              <template slot-scope="scope"
                ><a>{{ dayjs(scope.row.time).format("mm:ss") }}</a></template
              >
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
    <MusicControl :songMsg="isPlayingSong"></MusicControl>

    <Lyric></Lyric>
    <div class="mask"></div>
  </div>
</template>

<script>
/**
 * 1.一挂载到这个页面时不自动播放歌曲
 * 2.点击某一首歌时，触发播放
 * 3.实现自动播放
 */
import MusicControl from "./MusicControl";
import "./iconfont/iconfont.css";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";
import Lyric from "./Lyric";

export default {
  name: "Play",
  data() {
    return {
      dayjs: dayjs,
      checkedRowIndex: 0,
      songMsg: null
    };
  },
  computed: {
    ...mapState({
      isPlayingList: (state) => state.play.isPlayingList,
      isPlayingSong: (state) => state.play.isPlayingSong,
      checkedRowIndexVuex: (state) => state.play.checkedRowIndexVuex,
    }),
  },
  components: {
    MusicControl,
    Lyric
  },
  methods: {
    ...mapActions(["getIsPlayingSong", "changeCheckedRowIndex"]),
    // 表格某一行的样式
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
      // console.log(row);
      if (row.index === this.checkedRowIndexVuex) {
        return "success-row";
      } else {
        return "";
      }
    },
    // 点击播放
    playAudio(index, row) {
      /**
       * 1.新添加的歌曲已存在在播放列表中
       */
      row.showPlay = true;
      this.changeCheckedRowIndex(index);
      this.getIsPlayingSong(row);
    },
    // 点击头像去到首页
    toMy() {
      this.$router.push("/");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
a {
  color: #bdbdbd;
}
// 整个页面
.play_container {
  height: 100%;
  padding: 0 50px;
  box-sizing: border-box;

  overflow: hidden;
  .mask {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 99.1vw;
    height: 100vh;
    background: transparent url("./images/mask.jpg");
    background-size: cover;
    z-index: -1;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 90vw;
      height: 90vh;
      background: rgba(0, 0, 0, 0.6);
      background-size: cover;
      filter: blur(50px);
      z-index: -1;
      overflow: hidden;
      background-size: cover;
    }
  }
}
// 头部
.header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 头部头像
.header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
// 中间部分
.center_container {
  display: flex;
}
// 滚动条
.center_container .scrollbar {
  height: 630px;

  color: #070707;
}
// 底部边框
/deep/.el-table td, /deep/.el-table th.is-leaf{
  border: 0;
}
// 横向滚动条
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
// 每一行鼠标悬浮时
/deep/ .el-table tbody tr:hover > td {
  background-color: #141515;
}
// 左边
.center_container .left {
  width: 140px;
  color: #7b7b7b;
  flex-shrink: 0;
}
// 每个列表项
.center_container .left li {
  padding: 20px 0;
}
.active a {
  color: #e50078;
}
.active {
  position: relative;
  // background: green;
}
.active:before {
  content: "";
  display: block;
  width: 20px;
  height: 48px;
  background: url("./images/playing.gif") no-repeat;
  background-size: contain;
  position: absolute;
  left: -20px;
  top: 10px;
}
// 中间
.twoButtom {
  font-size: 14px;
  margin-bottom: 30px;
  display: flex;

  color: white;
}
// 两个按钮
.tb {
  width: 110px;
  padding: 10px 20px;
  border-radius: 20px;
  margin-right: 20px;
  border: 1px solid #6f6f6f;
  text-align: center;
}
/**
  1.有最大高度，超过这个高度的部分隐藏，使用滚轮滑动查看
*/
.center_container .center {
  width: 1130px;
}

// 复选框的背景颜色
/deep/.el-checkbox__inner {
  background: transparent;
}
// 被选中时的背景颜色
/deep/.el-checkbox__input.is-checked .el-checkbox__inner {
  background: transparent;
  border-color: #ccc;
}
// 表头复选框
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: transparent;
  border-color: #ccc;
}
// 聚焦时
/deep/.el-checkbox__input.is-focus .el-checkbox__inner {
  background: transparent;
  border-color: #ccc;
}

/deep/.el-table {
  color: red !important;
}

/deep/.el-table .warning-row {
  color: #34c934 !important;
}
// table底部白条
.el-table__row > td {
  border: none;
}

.el-table::before {
  height: 0px;
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
  font-size: 14px;
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

/deep/.el-table,
/deep/.el-table__expanded-cell {
  background-color: transparent !important;
}
/deep/.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
}
/deep/ .el-table__row {
  background-color: transparent !important;
}
/deep/.el-table th,
.el-table tr {
  background-color: transparent !important;
}
/deep/ .has-gutter {
  background-color: transparent !important;
}
/deep/ tr {
  background-color: transparent !important;
}
/deep/ .el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid transparent;
}
</style>
