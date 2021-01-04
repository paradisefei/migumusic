<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <div class="home-bannerList">
      <!-- <Carousel :carouselList="banners" /> -->
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img class="banner-item-img" :src="item.imgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 4个导航图标 -->
    <div class="home-navbar">
      <div class="home-navbar-inner">
        <div class="home-navbar-item">
          <a href="#"><img src="@static/images/home/ia_100000010.png" alt=""/></a>
          <a href="#"><img src="@static/images/home/ia_100000011.png" alt=""/></a>
          <a href="#"><img src="@static/images/home/ia_100000012.png" alt=""/></a>
          <a href="#"><img src="@static/images/home/ia_100000013.png" alt=""/></a>
        </div>
      </div>
    </div>
    <!-- 歌单推荐 -->
    <div class="home-recommend-list w">
      <!-- 歌单头部 -->
      <div class="home-recommend-title">
        <h2>歌单推荐</h2>
        <div class="home-recommend-more">
          <a href="#"
            >更多
            <i class="iconfont icon-more"></i>
          </a>
        </div>
      </div>
      <!-- 底部 -->
      <div class="home-recommend-container">
        <!-- 底部左边 -->
        <div class="home-recommend-container-left">
          <div class="container-left-box">
            <img src="@static/images/home/ia_100000037.jpg" alt="" />
            <p>开启你的咪咕专属歌单</p>
          </div>
        </div>
        <!-- 底部右边 -->
        <div class="home-recommend-container-right">
          <div
            class="container-right-item"
            v-for="recommendList in recommendPlayList"
            :key="recommendList.id"
          >
            <img :src="recommendList.picUrl" alt="" />
            <span>{{ recommendList.name }}</span>
            <div class="right-play-count">
              <i class="iconfont icon-erji"></i>
              <span>{{ recommendList.playCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新歌速递 -->
    <div class="home-newsong">
      <div class="home-newsong-tag w">
        <div class="tag-container">
          <span class="hoverchange">华语</span>
          <span class="hoverchange">欧美</span>
          <span class="hoverchange">日韩</span>
        </div>
      </div>

      <div class="home-newsong-data w">
        <div class="newsong-data-left">
          <div class="data-left-content"></div>
        </div>
        <div class="newsong-data-right">
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
          <div class="data-right-item">
            <img class="data-right-item-img" src="@static/images/home/ia_100000037.jpg" alt="" />
            <div class="data-right-item-content">
              <p>万岁圆舞曲</p>
              <p>薛之谦</p>
            </div>
            <span class="data-right-item-time">4:22</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新碟上架 -->
    <SectionSong></SectionSong>
  </div>
</template>

<script>
import { reqGetBannerList } from "@api/home";
import SectionSong from "@comps/SectionSong";
import { mapState, mapActions } from "vuex";
// import Carousel from "@comps/Carousel";

export default {
  name: "Home",
  data() {
    return {
      banners: []
    };
  },
  computed: {
    ...mapState({
      recommendPlayList: state => state.home.recommendPlayList
    })
  },
  methods: {
    ...mapActions(["getRecommendPlayList"])
  },
  async mounted() {
    const resBannerList = await reqGetBannerList();
    this.banners = resBannerList.bannerList;
    this.getRecommendPlayList();
  },
  components: {
    SectionSong
    // Carousel
  }
};
</script>

<style lang="less" scoped>
.w {
  width: 1400px;
  height: 100%;
  margin: 0 auto;
}
a {
  color: #999;
  font-size: 14px;
  &:hover {
    color: #fd3f7f;
    transition: all 0.5s;
  }
}
.home-bannerList {
  width: 100%;
  height: 350px;
}
.home-navbar {
  width: 100%;
  height: 80px;
  margin-top: 28px;

  .home-navbar-item {
    width: 992px;
    margin: 0 auto;
    img {
      padding: 0 25px;
      width: 198px;
      height: 80px;
    }
  }
}
.home-recommend-list {
  height: 557px;
  margin-top: 32px;

  .home-recommend-title {
    height: 62px;

    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 24px;
      color: #333;
    }
  }
  .home-recommend-container {
    height: 495px;

    display: flex;
    .home-recommend-container-left {
      width: 284px;
      background: url("../../static/images/home/gd_b_data.png") no-repeat;

      .container-left-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateY(100px);
        img {
          margin: o auto;
          width: 238px;
          height: 238px;
        }
        p {
          margin-top: 30px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
    .home-recommend-container-right {
      width: 1116px;
      display: flex;
      flex-wrap: wrap;
      .container-right-item {
        width: 20%;
        height: 50%;
        position: relative;
        span {
          margin: 16px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
        }
        img {
          cursor: pointer;
          border-radius: 10px;
          display: block;
          margin: 0 auto;
          height: 190px;
          width: 190px;
        }
        .right-play-count {
          border-radius: 12px;
          width: 78px;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          position: absolute;
          right: 20px;
          top: 10px;
          color: #fff;
          i {
            padding: 0 5px;
          }
          span {
            display: inline;
            margin: 0;
            padding: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.home-newsong {
  height: 470px;
  background: #f2f2f2;
  margin-top: 40px;
  .home-newsong-tag {
    height: 60px;
    .tag-container {
      height: 60px;
      width: 1060px;
      float: right;
      .hoverchange {
        margin-left: 26px;
        line-height: 60px;
        &:hover {
          color: #fd3f7f;
        }
      }
    }
  }
  .home-newsong-data {
    height: 410px;
    display: flex;
    .newsong-data-left {
      width: 340px;
      height: 410px;

      .data-left-content {
        width: 335px;
        height: 495px;

        position: relative;
        top: -60px;
        background: url("../../static/images/home/ia_100000011532.png");
        background-size: cover;
      }
    }
    .newsong-data-right {
      box-sizing: border-box;
      padding-top: 23px;
      width: 1060px;
      height: 410px;

      .data-right-item {
        float: left;
        width: 50%;
        height: 80px;

        margin-bottom: 15px;
        box-sizing: border-box;
        padding: 0 22px;
        display: flex;
        font-size: 14px;
        .data-right-item-img {
          width: 80px;
          height: 80px;
        }
        .data-right-item-content {
          width: 320px;
          padding-left: 20px;
          p {
            height: 40px;
            line-height: 40px;
          }
        }
        .data-right-item-time {
          line-height: 80px;
        }
      }
    }
  }
}
.home-bannerList {
  width: 84%;
  margin: 0 auto;
  /deep/ .el-carousel__item--card {
    margin-left: -320px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px #666;
  }
  .banner-item-img {
    border-radius: 10px;
  }
}
</style>
