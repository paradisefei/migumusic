<template>
  <div class="songList">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
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
          ><a>{{ scope.row.date }}</a></template
        >
      </el-table-column>
      <el-table-column prop="name" label="歌手">
        <template slot-scope="scope"
          ><a>{{ scope.row.name }}</a></template
        ></el-table-column
      >
      <el-table-column prop="address" label="专辑" show-overflow-tooltip>
        <template slot-scope="scope"
          ><a>{{ scope.row.address }}</a></template
        >
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
/**
 * 1.使用element ui组件
 *  1.列表
 *  2.样式，让3列平分整个宽度
 *  3.勾选时的颜色
 *  4.不要有线条
 *  5.分页器
 *    1.居中
 */
export default {
  name: "SongList",
  data() {
    return {
      fit: true,
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
  computed: {},
  methods: {
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
// 整个列表
.songList {
  width: 1160px;
}
/deep/.el-table td,
/deep/.el-table th.is-leaf {
  border: none;
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