<template>
  <div class="play_container">
    <div class="header">
      <img src="./images/logo.png" class="logo" />
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
          <a class="tb play active">
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
            fit
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column type="index" width="50">
              <template slot-scope="scope"
                ><a>{{ scope.$index + 1 }}</a></template
              ></el-table-column
            >
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
    <div class="bottom">
      <!-- 使用字体图标 -->
      <div class="control">
        <i class="iconfont icon-shangyiquicoyinlekongzhimianban"></i>
        <i class="iconfont icon-bofangicoyinlekongzhimianban"></i>
        <i class="iconfont icon-xiayiquicoyinlekongzhimianban"></i>
      </div>
      <div class="msgAndProgress">
        <div class="msg">
          <span class="name">修炼爱情-林俊杰</span>
          <span class="time">00:03/04:47</span>
        </div>
        <div class="progress">
          <div class="played">
            <div class="ball"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 1.正在播放的列表
 *  1.可以选中和批量选中歌曲，将歌曲添加到正在播放列表中进行播放
 *  2.只有在播放页面才可以删除正在播放的列表中的歌曲
 *  3.正在播放的数据放入vuex中
 * 2.在每一个songList中，点击播放时，将当前歌曲添加到正在播放列表中
 */
import "./iconfont/iconfont.css";
import { mapState } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Play",
  data() {
    return {
      dayjs: dayjs,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      isPlayingList: (state) => state.play.isPlayingList,
    }),
  },
  methods: {
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