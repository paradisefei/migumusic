<template>
  <div>
    <!-- 歌单列表 -->
    <div id="PlayListDetail" v-if="showUpdata">
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
        <el-table-column prop="name" label="名称" width="500">
        </el-table-column>
        <el-table-column prop="trackCount" label="曲目数"> </el-table-column>
        <el-table-column prop="createTime" label="创建日期"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button icon="el-icon-edit" size="mini" @click="updataSongMsg">
            </el-button>
            <el-button icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改歌单 -->
    <div id="create" v-else>
      <div class="header">
        <!-- 点击返回，改变父组件中的值 -->
        <a class="back" @click="updataSongMsg">返回</a>
        <span class="title">编辑歌单</span>
      </div>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="歌单封面">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌单名称">
          <el-input
            v-model="formLabelAlign.name"
            placeholder="请输入歌单名称"
            height="100px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌单介绍">
          <el-input
            type="textarea"
            :rows="18"
            v-model="formLabelAlign.type"
            placeholder="请输入歌单介绍"
          ></el-input>
          <div class="btn">
            <el-button class="save" type="primary" @click="save()"
              >保存</el-button
            >
            <el-button class="cancle" @click="updataSongMsg">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "PlayListDetail",
  data() {
    return {
      // 是否显示更新组件
      showUpdata: true,
      formLabelAlign: {
        name: "",
        type: "",
      },
      imageUrl: "",
      id: "",
    };
  },
  props: {
    playList: {
      type: Array,
    },
  },
  computed: {
    ...mapState({
      uid: (state) => state.login.uid,
      updateSongListName: (state) => state.updateSongList.updateSongListName,
    }),
  },
  methods: {
    ...mapActions(["getUpdateSongListName",'getPlayListDetail']),
    //  将 `this.getUpdateSongListName()` 映射为 `this.$store.dispatch('getUpdateSongListName')`
    save() {
      // 点击保存跳转到我的歌单页面，并重新发送请求
      // this.$emit("toggleShowCreate");
      // 发送请求
      // 需要2个参数，一个是当前歌单的id值，第二个是输入的歌单的名字
      // 获取当前歌单的id值，当点击修改时可以得到该行的相关信息，歌单的id值可以这个时候获取到
      let id = this.id;
      let name = this.formLabelAlign.name;
      console.log(this);
      let cookies = window.localStorage.getItem("userMsg");
      // 登录状态有cookies，可以修改歌单
      if (cookies) {
        this.getUpdateSongListName({ id, name });
      }
    },
    // 点击返回或取消时，改变头部的状态
    changeSongList() {
      this.$bus.$emit("changeShowSongListName");
    },
    // 更新歌曲信息
    updataSongMsg() {
      // 使用全局事总线，当点击编辑按钮时，会触发更新页面的显示状态

      this.showUpdata = !this.showUpdata;
      this.$bus.$emit("changeShowSongListName");
    },
    // 点击保存时触发的函数

    tableRowClassName({ row, rowIndex }) {
      // console.log(row);
      // 拿到歌单的id值，并更新data中的id
      let { id } = row;
      this.id = id;
      // console.log(id);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.header {
  height: 36px;
  line-height: 36px;
  margin-bottom: 50px;
  // background: red;
}
.header .back {
  padding: 2px 8px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 30px;
}
.header .title {
  font-size: 24px;
}
// 上传框
.avatar-uploader-icon {
  border: 1px solid #e91e63;
}
// 封面
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// input框的高度
/deep/.el-input__inner {
  height: 70px;
}
// 按钮
.btn {
  margin-top: 20px;
}
/deep/.el-button--primary {
  border-radius: 20px;
}
// 按钮颜色
/deep/.el-button--primary {
  background-color: #e91e63;
  border: 0;
}
.save {
  width: 60px;
  height: 30px;
  &:hover {
    color: #fff;
  }
}
.cancle {
  width: 60px;
  height: 30px;
  border: 1px solid #eeeeee;
  border-radius: 15px;
  &:hover {
    color: #409eff;
    background-color: #ecf5ff;
    border: 1px solid #c6e2ff;
  }
}
</style>
