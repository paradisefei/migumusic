<template>
  <div id="PlayListDetail">
    <el-table
      :data="playList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="歌单" width="180" height="120">
        <template v-slot="{ row }">
          <img :src="row.coverImgUrl" class="playListPic" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="500"> </el-table-column>
      <el-table-column prop="trackCount" label="曲目数"> </el-table-column>
      <el-table-column prop="createTime" label="创建日期"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button icon="el-icon-edit" size="mini"></el-button>
          <el-button icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "PlayListDetail",
  data() {
    return {
    };
  },
  props: {
    playList: {
      type: Array,
    },
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
// /deep/.el-table .warning-row {
//   background: oldlace;
// }

// /deep/.el-table .success-row {
//   background: #f0f9eb;
// }
// 每一行的高度
/deep/.el-table tbody tr {
  height: 120px;
  background: #f8f8f8;
  margin: 2px;
}
// 歌单图片
img.playListPic {
  width: 120px;
  height: 120px;
}
// 两个操作按钮
.el-button {
  font-size: 16px;
  font-weight: bolder;
  border: 0;
  padding: 0;
  background: transparent;
}
.el-button:hover {
  color: #e91e63;
}
</style>
