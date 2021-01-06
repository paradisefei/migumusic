<template>
  <div class="play_container">
    <div class="header">
      <img src="./images/logo.png" class="logo" />
      <img src="./images/uniaccess.png" class="avatar" @click="toMy" />
    </div>
    <div class="center_container">
      <ul class="left">
        <!-- 正在播放哪个列表，这个图标就显示在哪里
          1.加了active类，就会在前面
         -->
        <li class="active">
          <!-- <img class="isPlayingIcon" src="./images/playing.gif"> -->
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
            style="width: 100%; background: #393938"
            :row-style="{ height: '80px' }"
            fit
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column type="index" width="50">
              <template slot-scope="scope">
                <!-- <a>{{ scope.$index + 1 }}</a> -->
                <span v-if="checkedRowIndex != scope.$index">
                  <!-- 
                    1.点击另一个之后，之前播放的那个图标应该显示数字而不是图标
                   -->
                  <a
                    class="iconfont icon-bofang"
                    v-if="!scope.row.showPlay"
                    @mouseleave="scope.row.showPlay = true"
                    @click="playAudio(scope.$index, scope.row)"
                  ></a>
                  <a v-else @mouseenter="scope.row.showPlay = false">{{
                    scope.$index + 1
                  }}</a>
                  <!-- <a v-if="scope.row.showPlay" @mouseenter="scope.row.showPlay = false">{{
                    scope.$index + 1
                  }}</a> -->
                  <!-- 
                    1.能变成正在播放的图标，说明前面一步就已经的把自己那一行的scope.row.showPlay变成true了
                    2.点击前把自己的showPlay置为false
                   -->
                  <!-- <a
                    class="iconfont icon-bofang"
                    v-else
                    @mouseleave="scope.row.showPlay = true"
                    @click="playAudio(scope.$index, scope.row)"
                  ></a> -->
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
    <!-- 
      1.封装组件
      2.点击播放歌曲，把歌曲的id传到组件中，组件监视id的变化，一旦变化了就发送请求，渲染对应的歌曲信息
     -->
    <MusicControl :songMsg="isPlayingSong"></MusicControl>
  </div>
</template>

<script>
/**
 * 1.正在播放的列表
 *  1.可以选中和批量选中歌曲，将歌曲添加到正在播放列表中进行播放
 *  2.只有在播放页面才可以删除正在播放的列表中的歌曲
 *  3.正在播放的数据放入vuex中
 * 2.在每一个songList中，点击播放时，将当前歌曲添加到正在播放列表中
 * 3.这个页面挂载成功时，默认开始播放isPlayingList列表中的第一首歌曲
 *  1.每一行也有一个播放按钮和数字的切换
 */
import MusicControl from "./MusicControl";
import "./iconfont/iconfont.css";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Play",
  data() {
    return {
      dayjs: dayjs,
      checkedRowIndex: 0,
      songMsg: null,
    };
  },
  computed: {
    ...mapState({
      isPlayingList: (state) => state.play.isPlayingList,
      isPlayingSong: (state) => state.play.isPlayingSong,
    }),
  },
  components: {
    MusicControl,
  },
  methods: {
    ...mapActions(["getIsPlayingSong"]),
    // 表格某一行的样式
    tableRowClassName({ row, rowIndex }) {
      /**
       * 1.定义一个变量，表示被选中行的下标
       * 2.点击播放按钮，这一行的就加上样式，其他行不加样式
       *  1.点击播放按钮，拿到对应行的下标
       *  2.当某一行的下标等于得到的下标，就加上样式
       *    其他行的下标不等于得到的下标，就不加样式
       * 3.被选中行，图标会变成正在播放的图标
       */
      // console.log(row, rowIndex, this.checkedRowIndex);
      row.index = rowIndex;
      // console.log(row);
      if (row.index === this.checkedRowIndex) {
        return "success-row";
      } else {
        return "";
      }
    },
    // 点击播放
    playAudio(index, row) {
      /**
       * 1.点击播放，这一整行的字体颜色都变成红色
       *  1.修改table中一整行的字体颜色
       * 2.点击播放，把当前这首歌存到vuex中
       */
      console.log(11111111111, row);
      // this.$set(row, "showPlay", false);
      row.showPlay = true;
      this.checkedRowIndex = index;
      this.getIsPlayingSong(row);
      // this.
    },
    // 点击头像去到首页
    toMy() {
      this.$router.push("/");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {},
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
  background: #393938;
  overflow: hidden;
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
  background: #393938;
  color: #070707;
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
  background: #393938;
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
// 具体的音乐列表块
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  background: #393939;
  border-bottom: none;
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
// 改变表格中的字体样式
// /deep/.el-table .el-table__row {
//   color: green;
// }
// 表格某一行的样式

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
</style>