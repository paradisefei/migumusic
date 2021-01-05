<template>
  <div id="mylist">
    <div v-if="showCreate">
      <div class="header">
        <span class="list">我的歌单</span>
        <!-- 点击新建歌单会显示隐藏 -->
        <a class="create" @click="showCreate = false">+创建歌单</a>
      </div>
      <SongList></SongList>
    </div>
    <div v-else>
      <Create @toggleShowCreate="toggleShowCreate"></Create>
    </div>
  </div>
</template>

<script>
/**
 * 1.点击创建歌单出现歌单创建页面
 * 2.歌单和新建歌单显示隐藏
 */
import SongList from "@comps/SongList";
import Create from "./Create"
export default {
  name: "PlayList",
  data() {
    return {
      showCreate: true,
    };
  },
  methods: {
    toggleShowCreate() {
      this.showCreate = true;
    }
  },
  watch: {},
  components: {
    SongList,
    Create
  },
};
</script>

<style lang="less" scoped>
#mylist {
  min-height: 500px;
  // background: red;
}
// 头部
.header {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 我的歌单
.list {
  font-size: 24px;
  color: #e91e63;
}
// 创建歌单
.create {
  border: 1px solid black;
  padding: 5px;
  border-radius: 10px;
}
</style>
