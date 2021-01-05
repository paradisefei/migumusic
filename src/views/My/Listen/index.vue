<template>
  <div class="mylist right">
    <div class="twoButtom">
      <a class="tb play active">
        <i class="iconfont icon-bofang"></i>
        播放选中歌曲
      </a>
      <a class="tb add">
        <i class="iconfont icon-tianjiadao"></i>
        添加到
      </a>
    </div>
    <SongList></SongList>
  </div>
</template>

<script>
import SongList from "@comps/SongList";
export default {
  name: "Listen",
  data() {
    return {};
  },
  watch: {},
  components: {
    SongList,
  },
};
</script>

<style  lang="less" scoped>
// 底部右边的两个按钮
.right .twoButtom {
  font-size: 14px;
  display: flex;
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
// 被选中时要有背景颜色
.active {
  border: none;
  color: white;
  background: #e91e63;
}
</style>
