<template>
  <div id="mylist">
    <div v-if="showCreate">
      <div class="header" v-show="showSongListName">
        <span class="list">我的歌单</span>
        <!-- 点击新建歌单会显示隐藏 -->
        <a class="create" @click="showCreate = false">+创建歌单</a>
      </div>
      <!-- 歌单列表 -->
      <PlayListDetail :playList="playListDetail"></PlayListDetail>
    </div>
    <div v-else>
      <Create @toggleShowCreate="toggleShowCreate"></Create>
    </div>
  </div>
</template>

<script>
// import SongList from "@comps/SongList";
import Create from "./Create";
import PlayListDetail from "./PlayListDetail";
import { mapState, mapActions } from "vuex";

export default {
  name: "PlayList",
  data() {
    return {
      showCreate: true,
      showSongListName: true,
    };
  },
  computed: {
    ...mapState({
      uid: (state) => state.login.uid,
      playListDetail: (state) => state.my.playListDetail,
    }),
  },
  methods: {
    ...mapActions(["getPlayListDetail"]),
    toggleShowCreate() {
      this.showCreate = true;
    },
    // 改变创建歌单状态
    changeShowSongListName() {
      this.showSongListName = !this.showSongListName;
    },
  },
  watch: {},
  components: {
    Create,
    PlayListDetail,
  },
  async mounted() {
    /**
     * 1.挂载成功请求歌单数据
     */
    console.log(this.uid);
    await this.getPlayListDetail(this.uid);
    this.$bus.$on("changeShowSongListName", this.changeShowSongListName);
  },
};
</script>

<style lang="less" scoped>
#mylist {
  min-height: 500px;
}
// 头部
.header {
  width: 1000px;
  margin-bottom: 30px;
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
