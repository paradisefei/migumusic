<template>
  <div class="border-bottom">
    <div class="header">
      <div>
        <ul class="center">
          <li class="active">首页</li>
          <li>歌单</li>
          <li>专辑</li>
          <li>榜单</li>
          <li>歌手</li>
          <li>彩铃</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="less" scoped>
.border-bottom {
  border-bottom: 1px solid rgb(233, 233, 233);
  box-shadow: 2px 4px 8px #f2f2f2;
}
.header {
  width: 1400px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: relative;
  .center {
    display: flex;
    justify-content: space-around;
    width: 492px;
    font-size: 14px;
    margin-left: 138px;
    .active {
      color: #e91e63;
    }
  }
}
</style>
