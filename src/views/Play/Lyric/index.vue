<template>
  <div class="outer">
    <div class="inner">
      <div class="inner-img"><img src="@static/images/home/ia_100000037.jpg" alt="" /></div>
      <div class="inner-container">
        <div class="inner-container-title">
          <p>歌曲名:q2</p>
          <p>歌手名:123123</p>
        </div>
        <div class="inner-container-scorll">
          <el-scrollbar class="scroll">
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>23123</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
            <p>231asdasdad23</p>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lyric"
};
</script>

<style lang="less" scoped>
.outer {
  width: calc(100vw - 100px - 140px - 1130px);
  min-width: 300px;
  background: brown;
  height: calc(100vh - 110px - 100px);
  min-height: 200px;
  position: fixed;
  right: 40px;
  top: 70px;
  z-index: 999;
  min-height: 300px;
}
.inner {
  position: relative;
  width: 240px;
  height: 100%;
  background: gold;
  margin: 0 auto;

  .inner-img {
    width: 200px;
    height: 200px;
    img {
      padding: 0 20px;
      width: 200px;
      height: 200px;
    }
  }
  .inner-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 100px;
    margin: auto;
    margin-top: 200px;
    background: yellowgreen;
    .inner-container-title {
      text-align: center;
      color: #999;

      font-size: 14px;
      p {
        height: 30px;
        line-height: 30px;
      }
    }
    .inner-container-scorll {
      background: turquoise;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      min-height: 10px;
      margin: auto;
      margin-top: 60px;
      overflow: hidden;
      .scroll {
        height: 100%;
        width: 100%;
      }
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
      /deep/ .el-select-dropdown .el-scrollbar {
        padding-bottom: 17px;
      }
    }
  }
}
</style>
