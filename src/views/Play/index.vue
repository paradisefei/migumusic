<template>
  <div class="play_container">
    <div class="header">
      <img src="./images/logo.png" class="logo" />
      <img src="./images/uniaccess.png" class="avatar" />
    </div>
    <div class="center_container">
      <ul class="left">
        <li class="active">
          <a>默认播放列表</a>
        </li>
        <li>
          <a>喜欢的音乐</a>
        </li>
      </ul>
      <div class="center">
        <!-- 引入列表组件
          这里的模式和之前的是不同的，这里是可滑动不需要分页的，那边是分页的
         -->
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
        <div class="music_Content">
          <ul class="musicList">
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
            <li>你好</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- 使用字体图标 -->
      <div class="control">
        <i class="iconfont icon-shangyiquicoyinlekongzhimianban"></i>
        <i class="iconfont icon-bofangicoyinlekongzhimianban"></i>
        <i class="iconfont icon-xiayiquicoyinlekongzhimianban"></i>
      </div>
      <div class="progress">
        <div class="played">
          <div class="ball"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./iconfont/iconfont.css";

export default {
  name: "Play",
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
a {
  color: white;
}
// 整个页面
.play_container {
  height: 100%;
  padding: 0 50px;
  box-sizing: border-box;
  background: #393938;
  overflow: hidden;
}
// 头部
.header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// 头部头像
.header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
// 中间部分
.center_container {
  display: flex;
}
// 左边
.center_container .left {
  width: 140px;
  color: #7b7b7b;
}
// 每个列表项
.center_container .left li {
  padding: 20px 0;
}
.active a {
  color: #e50078;
}
// 中间
.twoButtom {
  font-size: 14px;
  display: flex;
  background: #393938;
  color: white;
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
/**
  1.有最大高度，超过这个高度的部分隐藏，使用滚轮滑动查看
*/
.center_container .center {
  width: 970px;
  background: white;
}
.music_Content {
  padding-top: 40px;
}
// 具体的音乐列表块
.center_container .music_Content {
  width: 100%;
  height: 630px;
  background: #393938;

  overflow: hidden;
}
// 音乐列表
.center_container .music_Content .musicList {
  position: absolute;
  overflow: auto;
}
// 底部播放控制
.bottom {
  width: 80%;
  height: 110px;
  // position: absolute;
  // bottom: 20px;
  // background: red;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.bottom .control {
  width: 280px;
  height: 100%;
  font-size: 32px;
  color: white;
  // background: yellow;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.bottom .progress {
  width: 760px;
  height: 4px;
  background: #848484;
}
// 已播放
.bottom .progress .played {
  width: 10%;
  height: 100%;
  background: white;
}
// 播放秋
.bottom .progress .played .ball {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: white;
  position: relative;
  top: -4px;
  left: 100%;
}
</style>