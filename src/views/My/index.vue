<template>
  <div class="my_center">
    <!-- 上方背景图部分
      1.设置背景图
      2.头像
      3.使用flex
      4.等级
      5.字体图标
        1.下载
        2.引入css
      6.监视滚轮的变化
     -->
    <div class="top">
      <div class="avatar">
        <img src="./images/uniaccess.png" class="avatarImg" />
        <!-- 等级 -->
        <span class="level">LV5 咪咕新人</span>
      </div>
      <span class="username">
        欢乐的大提琴
        <i class="iconfont icon-VIPICON"></i>
        <i class="iconfont icon-cailing"></i>
      </span>
      <span class="money"
        >咪咕币：0
        <a class="putMoney">充值</a>
      </span>
    </div>
    <!-- 下方的各种列表
      1.歌曲列表渲染
     -->
    <div class="bottom">
      <!-- 左边的固定定位部分
        1.固定定位
       -->
      <!-- 右边的列表
        1.播放和选中按钮
        2.大小
        3.字体图标
      -->
      <ul class="left" :class="isAbsolute ? 'isAbsolute' : 'isFixed'">
        <li class="active">
          <a>最近在听</a>
        </li>
        <li>
          <a>我喜欢的</a>
        </li>
        <li>
          <a>我的歌单</a>
        </li>
        <li>
          <a>关注歌手</a>
        </li>
        <li>
          <a>数字专辑</a>
        </li>
        <li>
          <a>彩铃设置</a>
        </li>
      </ul>
      <div class="right">
        <div class="twoButtom">
          <div class="tb play active">
            <i class="iconfont icon-bofang"></i>
            播放选中歌曲
          </div>
          <div class="tb add">
            <i class="iconfont icon-tianjiadao"></i>
            添加到
          </div>
        </div>
        <SongList></SongList>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 1.顶部背景图
 */
import "./icon/iconfont.css";
import SongList from "@comps/SongList";
export default {
  name: "My",
  data() {
    return {
      // 是否是绝对定位
      isAbsolute: true,
    };
  },
  computed: {},
  methods: {
  },
  components: {
    SongList,
  },
  mounted() {
    window.onscroll = (e) => {
      let scrollY = e.path[1].pageYOffset;
      if (scrollY < 360) {
        this.isAbsolute = true;
      } else {
        this.isAbsolute = false;
      }
    };
  },
};
</script>

<style lang="less" scoped>
// 上半部分
.top {
  width: 100%;
  height: 360px;
  color: white;
  font-size: 14px;
  margin-bottom: 45px;
  background: url("./images/my-header-bg.png");

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
// 头像部分
.top .avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
// 头像的图片
.top .avatar .avatarImg {
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
// 等级
.top .avatar .level {
  background: #f1ba26;
  padding: 0px 10px;
  margin-top: -10px;
  border-radius: 20px;
}
// 头部区域的用户名
.top .username {
  font-size: 24px;
  padding: 10px 0;
  font-weight: bold;
}
// 用户名中的字体图标
.top .username i {
  font-weight: normal;
  font-size: 24px;
}
// 充值按钮
.top .putMoney {
  color: #e91e63;
  border: 1px solid #e91e63;
  border-radius: 5px;
  margin-left: 5px;
  padding: 0 2px;
}
// 底部
.bottom {
  width: 1400px;
  padding-left: 240px;
  box-sizing: border-box;
  margin: 0 auto;
  // background: #f1ba26;
}
// 左边固定定位部分
/**
  1.当右边列表的上方没有超出页面时，这个块是跟着右边列表一起动的
  2.当块走到离顶部一定距离的时候，就停住不动了
*/
.bottom .left {
  background: red;
  // left: 0px;
  margin-left: -230px;
  background: #333333;
}
// 绝对定位的类名
.isAbsolute {
  position: absolute;
}
// 固定定位的类名
.isFixed {
  position: fixed;
  top: 30px;
}
// 左边列表中的每一项
.bottom .left li {
  width: 200px;
  height: 55px;
  line-height: 55px;
  padding-left: 30px;
  box-sizing: border-box;
}
// 左边列表中的每一项
.bottom .left li a {
  color: white;
}
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