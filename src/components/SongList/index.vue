<template>
  <div class="songList">
    <el-table
      ref="multipleTable"
      :data="songListFinally"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      @selection-change="handleSelectionChange"
      @select-all="allSelect"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column width="50">
        <template slot-scope="scope">
          <a
            class="iconfont icon-bofang"
            v-if="scope.row.showPlay"
            @mouseleave="scope.row.showPlay = false"
            @click="toPlay(scope)"
          ></a>
          <a v-else @mouseenter="handleMouseEnter(scope.row)">{{
            scope.$index + 1
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="歌曲">
        <template slot-scope="scope">
          <div class="songAndPic">
            <img :src="scope.row.pic" class="songPic" />
            <a class="songName">{{ scope.row.song }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手">
        <template slot-scope="scope"
          ><a>{{ scope.row.singer }}</a></template
        ></el-table-column
      >
      <el-table-column prop="address" label="专辑" show-overflow-tooltip>
        <template slot-scope="scope"
          ><a>{{ scope.row.album }}</a></template
        >
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="10"
      :pager-count="11"
      layout="prev, pager, next"
      :total="songList ? songList.length : 0"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import "./iconfont/iconfont.css";
import { mapActions, mapState } from "vuex";
export default {
  name: "SongList",
  data() {
    return {
      fit: true,
      // showPlay: true,
      songListFinally: [],
      currentPage: 1,
      songMsg: [],
    };
  },
  props: {
    songList: {
      type: Array,
    },
  },
  watch: {
    songList(newValue) {
      this.songListFinally = newValue.slice(0, 10);
    },
  },
  computed: {
    ...mapState(["isPlayingList"]),
  },
  methods: {
    ...mapActions(["addOneSong", "getIsPlayingSong", "ADD_SONG", "PLAY_SONG"]),
    // 点击分页器页码
    handleCurrentChange(value) {
      /**
       * 1.第1页，下标为0-9
       * 2.第2页，下标为10-19
       * 3.第3页，下标为20-29
       */
      this.songListFinally = this.songList.slice(value * 10 - 10, value * 10);
    },
    // 去到播放界面
    async toPlay(scope) {
      console.log(scope.row);
      // 把被点击的歌曲保存到vuex中
      await this.getIsPlayingSong(scope.row);
      // 把被点击的歌曲添加到正在播放列表的最前端
      this.addOneSong(scope.row);
      this.$router.push("/play");
    },

    // 播放按钮显示隐藏
    handleMouseEnter(row) {
      this.$set(row, "showPlay", true);
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
    // 单选
    async handleSelectionChange(val) {
      /**
       * 1.把数组中的每一项添加到正在播放列表中
       * 2.先把正在播放列表清空
       * 3.把列表添加到正在播放列表中
      //  */
      // this.$store.commit("CLEAR_IS_PLAYING_LIST");
      this.multipleSelection = val;
      console.log("val", val, val[val.length - 1]);
      let newVal = val.map((item) => {
        return {
          ...item,
          showPlay: true
        }
      })
      this.$store.commit("ADD_SONG", newVal.slice(0, -1));
      await this.getIsPlayingSong(newVal[newVal.length - 1]);
      this.addOneSong(newVal[newVal.length - 1]);
      // this.$store.commit("ADD_SONG");
      // this.songMsg = {
      //   ...val[0],
      // };
      // console.log("this.songMsg", this.songMsg);
      // this.ADD_SONG(this.songMsg);
      // this.$store.commit("ADD_SONG", val);
    },
    // 全选
    async allSelect(value) {
      /**
       * 1.自动播放第一首歌
       */
      // console.log("value", value);
      let newValue = value.map((item) => {
        return {
          ...item,
          showPlay: true
        }
      })
      this.$store.commit("ADD_SONG", newValue.slice(1));
      await this.getIsPlayingSong(newValue[0]);
      this.addOneSong(newValue[0]);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
// 整个列表
.songList {
  width: 1160px;
  margin-top: 20px;
}
// 歌曲图片
img.songPic {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}
// 歌名和图片
.songAndPic {
  display: flex;
  align-items: center;
}
// 歌名
a.songName:hover {
  color: #e91e63;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border: none;
}
// 复选框的背景颜色
/deep/.el-checkbox__inner {
  background: transparent;
}
// 被选中时的背景颜色
/deep/.el-checkbox__input.is-checked .el-checkbox__inner {
  background: #333333;
  border-color: #ccc;
}
// 表头复选框
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: transparent;
  border-color: transparent;
}
// 每一列
.el-table-column:hover {
  cursor: pointer;
}
// 分页器
/**
  1.被选中时的样式
    1.有背景颜色
    2.字体颜色为白色
*/
/deep/.el-pagination {
  height: 60px;
  padding: 10px 0;
  text-align: center;
  font-weight: normal;
}
/deep/.el-pager li {
  width: 44px !important;
  height: 44px;
  line-height: 44px;
  margin: 0 20px;
}
/deep/.el-pager li.active {
  border-radius: 50%;
  text-align: center;
  color: white;
  background: #e91e63;
}
/deep/.el-pagination button {
  width: 44px;
  height: 44px;
  line-height: 44px;
}
/deep/.el-pagination button:hover,
/deep/.el-pager li:hover {
  border-radius: 50%;
  background: #e91e63;
  color: white;
}
</style>