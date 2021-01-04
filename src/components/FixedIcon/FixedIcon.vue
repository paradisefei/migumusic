<template>
  <div class="fixIcon">
    <div class="iconBox">
      <span class="iconfont icon-fanhuidingbu"></span>
    </div>
    <div class="iconBox">
      <span class="iconfont icon-kefu icon"></span>
    </div>
    <div class="iconBox">
      <span class="iconfont icon-bofang1 icon"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixedIcon",
};
</script>

<style lang="less" scoped>
html {
  position: relative;
}

.fixIcon {
  position: fixed;
  bottom: 50px;
  right: 100px;
  width: 54px;
  height: 164px;

  .iconBox {
    width: 100%;
    height: 54px;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fff;
    .iconfont {
      font-size: 30px;
      color: #fff;
    }
    .icon:hover {
      color: #e91e63;
    }
  }
}
</style>
