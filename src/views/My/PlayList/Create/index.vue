<template>
  <div id="create">
    <div class="header">
      <!-- 点击返回，改变父组件中的值 -->
      <a class="back" @click="toggle">返回</a>
      <span class="title">创建歌单</span>
    </div>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="歌单封面">
        <el-upload
          class="avatar-uploader"
          action="http://81.69.57.198:3000/my/playlist"
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
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="toggle">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      formLabelAlign: {
        name: "",
        type: "",
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapState({
      // createSongList: (state) => state.create.createSongList,
      uid: (state) => state.login.uid,
    }),
  },
  methods: {
    ...mapActions(["getCreateSongList", "getPlayListDetail"]),
    // ...mapActions(["getCreateSongList"]),
    // 保存歌单
    async save() {
      console.log(1);
      // 调用接口，保存数据
      await this.getCreateSongList(this.formLabelAlign.name);
      // 点击保存跳转到我的歌单页面，并重新发送请求
      this.$emit("toggleShowCreate");
      // 发送请求,获取最新的歌单列表数据
      await this.getPlayListDetail(this.uid);
    },
    // c添加歌单显示
    toggle() {
      this.$emit("toggleShowCreate");
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
  mounted() {
    // this.getCreateSongList(this.formLabelAlign.name);
  },
};
</script>

<style lang="less" scoped>
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
/deep/.el-button {
  border-radius: 20px;
}
// 按钮颜色
/deep/.el-button--primary {
  background-color: #e91e63;
  border: 0;
}
</style>
