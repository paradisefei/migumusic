<template>
  <div class="my_center">
    <div class="top">
      <div class="avatar">
        <img :src="avatarUrl" class="avatarImg" v-if="avatarUrl" />
        <img src="@assets/images/no-login.png" class="avatarImg" v-else />
        <!-- 等级 -->
        <span class="level">LV9 咪咕尊享会员</span>
      </div>
      <span class="username">
        {{ nickname }}
        <i class="iconfont icon-VIPICON"></i>
        <i class="iconfont icon-cailing"></i>
      </span>
      <span class="money"
        >咪咕币：67354611
        <a class="putMoney">充值</a>
      </span>
    </div>
    <div class="bottom">
      <ul class="left" :class="isAbsolute ? 'isAbsolute' : 'isFixed'">
        <li
          v-for="item in leftList"
          :key="item.id"
          :class="isActive === item.id ? 'active' : ''"
          @click="handleTitle(item.id)"
        >
          <a>{{ item.title }}</a>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "./icon/iconfont.css";
// import SongList from "@comps/SongList";
// import Create from "@views/My/MyList/Create";
import { mapState } from "vuex";
export default {
  name: "My",
  data() {
    return {
      // 是否是绝对定位
      isAbsolute: true,
      // 是否被选中
      isActive: 1,
      // 左边定位的列表数据
      leftList: [
        {
          id: 1,
          title: "最近在听"
        },
        {
          id: 2,
          title: "我喜欢的"
        },
        {
          id: 3,
          title: "我的歌单"
        },
        {
          id: 4,
          title: "关注歌手"
        },
        {
          id: 5,
          title: "数字专辑"
        },
        {
          id: 6,
          title: "彩铃设置"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      nickname: state => state.login.nickname,
      avatarUrl: state => state.login.avatarUrl
    })
  },
  methods: {
    handleTitle(id) {
      if (this.isActive === id) return;
      // console.log(id);
      this.isActive = id;

      if (id === 1) {
        this.$router.push("/my/listen");
      }
      if (id === 3) {
        this.$router.push("/my/playlist");
      }
    }
  },
  components: {
    // Create,
  },
  mounted() {
    window.onscroll = e => {
      let scrollY = e.path[1].pageYOffset;
      if (scrollY < 420) {
        this.isAbsolute = true;
      } else {
        this.isAbsolute = false;
      }
    };
  }
};
</script>

<style lang="less" scoped>
.bottom .left li:hover {
  transition: all 0.3s;
  background: #e91e63;
}
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
  top: 50px;
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
