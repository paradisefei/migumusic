<template>
  <div id="mylist">
    <div class="header">
      <span class="list">我的歌单</span>
      <a class="create">+创建歌单</a>
    </div>
    <SongList></SongList>
  </div>
</template>

<script>
/**
 * 1.点击创建歌单出现歌单创建页面
 */
import SongList from "@comps/SongList";
export default {
  name: "MyList",
  data() {
    return {
    };
  },
  watch: {
  },
  components: {
    SongList
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
