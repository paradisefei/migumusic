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
          <a href="#" v-for="item in fourForKingKong" :key="item.id"
            ><img :src="item.imgUrl" alt=""
          /></a>
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
            <!-- <div class="mask"></div> -->
            <img
              src="//cdnmusic.migu.cn/tycms_picture/20/06/170/200618151935142_500x500_7541.jpg"
              alt=""
            />
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
            <img :src="recommendList.coverImgUrl" alt="" />
            <span>{{ recommendList.name }}</span>
            <div class="right-play-count">
              <i class="iconfont icon-erji"></i>
              <span>{{ parseInt(recommendList.playCount / 10000) }}w</span>
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
          <div class="data-left-content">
            <img
              v-for="list in playListImg"
              :key="list.al.picUrl"
              class="data-left-imgs"
              :src="list.al.picUrl"
              alt=""
            />
          </div>
        </div>
        <div class="newsong-data-right">
          <div class="data-right-item" v-for="list in playList" :key="list.al.id">
            <img class="data-right-item-img" :src="list.al.picUrl" alt="" />
            <div class="data-right-item-content">
              <p>{{ list.al.name }}</p>
              <p class="data-right-item-content-name">{{ list.ar[0].name }}</p>
            </div>
            <span class="data-right-item-time">{{ dayjs(list.dt).format("mm:ss") }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 新碟上架 -->
    <SectionSong :h2Title="h2Title[0]"></SectionSong>

    <!-- 新碟上架 -->
    <SectionSong :h2Title="h2Title[1]"></SectionSong>

    <!-- 排行榜 -->
    <div class="rank-list-title w">
      <h2>排行榜</h2>
      <div class="rank-list-more">
        <a href="#"
          >更多
          <i class="iconfont icon-more"></i>
        </a>
      </div>
    </div>
    <div class="rank-list">
      <div class="rank-list-container w">
        <div class="rank-list-container">
          <div class="rank-list-left">
            <!-- 轮播图 -->
            <div class="rank-list-carousel">
              <el-carousel
                type="card"
                height="213px"
                indicator-position="none"
                arrow="always"
                :autoplay="false"
              >
                <el-carousel-item v-for="item in banners" :key="item.id">
                  <img :src="item.imgUrl" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>
            <h3 class="rank-list-title">尖叫榜新歌</h3>
            <p class="rank-list-time">每小时更新</p>
            <div class="rank-list-play"><i class="iconfont icon-play"></i> 播放榜单</div>
          </div>
          <div class="rank-list-right">
            <!-- 滚动条 -->
            <div class="rank-list-right-scroll">
              <el-scrollbar class="scroll">
                <!-- 滚动条歌曲排行榜 -->
                <div class="item-column">
                  <span class="item-num">01</span>
                  <img class="item-img" src="@static/images/home/ia_100000024.jpg" alt="" />

                  <span class="item-songname">迟迟奥士达按时打算打算 </span>
                  <span class="item-singername">薛之谦奥士达按时奥士达奥士达</span>
                </div>
                <div class="item-column">
                  <span class="item-num">01</span>
                  <img class="item-img" src="@static/images/home/ia_100000024.jpg" alt="" />

                  <span class="item-songname">迟迟</span>
                  <span class="item-singername">薛之谦</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 音乐人 -->
    <SectionSong :h2Title="h2Title[2]"></SectionSong>
  </div>
</template>
<script>
import { reqGetBannerList, reqGetFourForKingKong, reqGetPlayListChinese } from "@api/home";
import SectionSong from "@comps/SectionSong";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      fourForKingKong: [],
      playList: [],
      playListImg: [],
      h2Title: ["新碟上架", "数字专辑", "音乐人"]
    };
  },
  computed: {
    ...mapState({
      recommendPlayList: state => state.home.recommendPlayList
    })
  },
  methods: {
    ...mapActions(["getRecommendPlayList"]),
    /* 华语歌单 */
    async getPlayListChinese() {
      const resPlayListChinese = await reqGetPlayListChinese();
      this.playList = resPlayListChinese.playlist.tracks.splice(1, 8);
      this.playListImg = this.playList.slice(0, 6);
    }
  },
  async mounted() {
    this.dayjs = dayjs;
    /* 轮播 */
    const resBannerList = await reqGetBannerList();
    this.banners = resBannerList.bannerList;
    /* 金刚 */
    const resFourForKingKong = await reqGetFourForKingKong();
    this.fourForKingKong = resFourForKingKong.kingKongList;
    /* 推荐歌单 */
    this.getRecommendPlayList();

    this.getPlayListChinese();
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
      margin: 0 25px;
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
          border-radius: 10px;
          margin: o auto;
          width: 238px;
          height: 238px;
        }
        p {
          margin-top: 40px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
    .home-recommend-container-right {
      width: 1116px;
      display: flex;
      flex-wrap: wrap;
      color: #666;
      font-size: 14px;
      .container-right-item {
        width: 20%;
        height: 50%;
        position: relative;
        span {
          margin: 12px 16px;
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
          background: rgba(27, 25, 25, 0.4);
          position: absolute;
          right: 20px;
          top: 10px;
          color: #fff;
          i {
            padding: 0 8px;
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
        // padding: 6px 6px 0 6px;
        position: relative;
        top: -60px;
        background: url("../../static/images/home/ia_100000011532.png");
        background-size: cover;
        display: flex;
        z-index: 10;
        flex-wrap: wrap;
        .data-left-imgs {
          opacity: 0.3;
          width: 50%;
          height: 33.3%;
        }
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
        border-radius: 10px;
        &:hover {
          background: #e6e6e6;
        }
        .data-right-item-img {
          border-radius: 10px;
          width: 80px;
          height: 80px;
        }
        .data-right-item-content {
          width: 300px;
          padding: 0 20px;
          p {
            margin-top: 10px;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .data-right-item-content-name {
            color: rgba(51, 51, 51, 0.4);
          }
        }
        .data-right-item-time {
          color: rgba(51, 51, 51, 0.4);
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
  /deep/ .el-carousel__button {
    background: #e91e63;
  }
  .banner-item-img {
    border-radius: 10px;
  }
}
.rank-list-title {
  height: 62px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 24px;
    color: #333;
  }
}
.rank-list {
  width: 100%;
  height: 474px;
  background: #f2f2f2;
  .rank-list-container {
    display: flex;
    .rank-list-left {
      width: 542px - 80;
      margin-right: 80px;
      height: 443px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .rank-list-carousel {
        height: 213px;
        width: 100%;
        img {
          height: 213px;
          width: 213px;
        }
      }
      .rank-list-title {
        height: 27px;
        font-size: 18px;
        margin-top: 20px;
      }
      .rank-list-time {
        margin-top: 15px;
        color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
      }
      .rank-list-play {
        text-align: center;
        line-height: 38px;
        height: 38px;
        width: 138px;
        border: 1px solid #333;
        margin-top: 22px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 14px;
      }
    }
    .rank-list-right {
      padding: 21px 24px 0;
      width: 810px;
      height: 432px;

      .rank-list-right-scroll {
        width: 100%;
        height: 100%;

        /deep/.el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .scroll {
          width: 100%;
          height: 100%;
          .item-column {
            border-radius: 10px;
            height: 60px;
            width: 100%;

            display: flex;
            color: #333;
            font-size: 14px;
            padding: 6px 0;
            &:hover {
              background-color: #e6e6e6;
              transition: all 0.8s;
            }
            .item-num {
              display: inline-block;
              height: 60px;
              width: 60px;
              color: #333;
              line-height: 60px;
              text-align: center;
            }
            .item-img {
              border-radius: 10px;
              cursor: pointer;
              height: 60px;
              width: 60px;
            }
            .item-songname {
              padding-left: 30px;
              height: 60px;
              width: 370px;
              margin-right: 10px;

              line-height: 60px;
            }
            .item-singername {
              height: 60px;
              color: rgba(51, 51, 51, 0.6);
              line-height: 60px;
            }
          }
        }
      }
    }
  }
}
</style>
