<template>
  <div class="header">
    <h1 class="logo">
      <img src="../../assets/images/logo.png" />
    </h1>
    <div>
      <ul class="center">
        <li class="active">音乐</li>
        <li>现场</li>
        <li>会员中心</li>
        <li>凡响计划</li>
        <li>客户端下载</li>
      </ul>
    </div>
    <div class="searchText">
      <input
        class="search"
        type="text"
        name=""
        id=""
        placeholder="搜索歌曲、歌手、MV"
      />
      <span class="iconfont icon-search"></span>
    </div>
    <div class="login">
      <a href="">
        <img src="../../assets/images/no-login.png" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="less" scoped>
.header {
  width: 1400px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 50px;
  }
  .center {
    display: flex;
    justify-content: space-around;
    width: 492px;
    font-size: 16px;
    .active {
      color: #e91e63;
    }
  }
  .login {
    position: absolute;
    top: 18px;
    right: 0;
  }

  .searchText {
    width: 300px;
    height: 40px;
    background-color: #f2f2f2;
    border-radius: 50px;
    border-style: none;
    margin-left: 350px;
    .search {
      margin: 13px 0;
      padding-left: 13px;
      width: 230px;
      border-radius: 50px;
      background-color: #f2f2f2;
      outline: none;
      border: none;
    }
    .iconfont {
      display: inline-block;
      width: 21px;
      height: 21px;
      font-weight: 800;
    }
    .iconfont:hover {
      color: #e91e63;
      cursor: pointer;
    }
  }
}
</style>
