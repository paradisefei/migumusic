<template>
  <div class="songList">
    <el-table
      ref="multipleTable"
      :data="songListFinally"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      @selection-change="handleSelectionChange"
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
import { mapActions } from "vuex";
export default {
  name: "SongList",
  data() {
    return {
      fit: true,
      // showPlay: true,
      songListFinally: [],
      currentPage: 1,
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
  computed: {},
  methods: {
    ...mapActions(["addOneSong", "getIsPlayingSong"]),
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
    toPlay(scope) {
      /**
       * 1.把当前歌曲添加到正在播放的列表中
       * 2.触发vuex中的函数执行
       * 3.把这首歌的信息保存到vuex中
       */
      // console.log(scope.row);
      this.getIsPlayingSong(scope.row);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
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