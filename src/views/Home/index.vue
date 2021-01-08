<template>
  <div class="home-container" style="margin: 28px 0">
    <!-- 轮播图 -->
    <div class="home-bannerList">
      <!-- <Carousel :carouselList="banners" /> -->
      <el-carousel :interval="4000" type="card" height="350px">
        <el-carousel-item v-for="item in banners" :key="item.id">
          <img class="banner-item-img" v-lazy="item.imgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 4个导航图标 -->
    <div class="home-navbar">
      <div class="home-navbar-inner">
        <div class="home-navbar-item">
          <router-link to="/play" v-for="item in fourForKingKong" :key="item.id"
            ><img :src="item.imgUrl" alt=""
          /></router-link>
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
            v-for="(recommendList, index) in recommendPlayList"
            :key="recommendList.id"
            @mouseenter="hoverBigImg(index)"
            @mouseleave="leaveBigImg(index)"
            @click="getRecommendList(index)"
          >
            <img
              class="container-right-item-showImg"
              src="@static/images/home/ia_100000166.png"
              alt=""
              v-show="recommendList.isPlayShow"
            />

            <img v-lazy="recommendList.coverImgUrl" alt="" />
            <span>{{ recommendList.name }}</span>
            <div class="right-play-count">
              <i class="iconfont icon-erji"></i>
              <span>{{ parseInt(recommendList.playCount / 10000) }}W</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新歌速递 -->
    <div class="home-newsong">
      <div class="home-newsong-tag">
        <div class="tag-container">
          <span
            class="hoverchange"
            :class="item.active ? 'active' : ''"
            v-for="(item, index) in tabChangeList"
            :key="item.topId"
            @click="tabChange(index)"
            >{{ item.title }}</span
          >
        </div>
      </div>

      <div class="home-newsong-data w">
        <div class="newsong-data-left">
          <div class="data-left-content">
            <img
              v-for="list in playListImg"
              :key="list.al.picUrl"
              class="data-left-imgs"
              v-lazy="list.al.picUrl"
              alt=""
            />
          </div>
        </div>
        <div class="newsong-data-right">
          <div
            class="data-right-item"
            v-for="list in playList"
            :key="list.al.id"
            @mouseenter="songMouseEnter(list)"
            @mouseleave="songMouseLeave(list)"
            @click="getSongMessage(list)"
          >
            <div class="data-right-item-img-container">
              <img class="data-right-item-img" v-lazy="list.al.picUrl" alt="" />
            </div>
            <div class="data-right-item-content">
              <p class="data-right-item-content-name1">{{ list.name }}</p>
              <p class="data-right-item-content-name2">{{ list.ar[0].name }}</p>
            </div>
            <span
              class="data-right-item-time"
              v-show="!list.isPlayButtonShow"
              >{{ dayjs(list.dt).format("mm:ss") }}</span
            >
            <div class="data-right-item-show" v-show="list.isPlayButtonShow">
              <div class="data-right-item-show-img">
                <img
                  src="@static/images/home/ia_100000166.png"
                  class=""
                  alt=""
                />
              </div>
            </div>
            <div
              class="data-right-item-show-icon"
              v-show="list.isPlayButtonShow"
            >
              <i class="iconfont icon-aixin"></i>
              <i class="iconfont icon-zhuanfa"></i>
              <i class="iconfont icon-lingdang"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新碟上架 -->
    <SectionSong :h2Title="h2Title[0]" :songList="newSongList"></SectionSong>

    <!-- 新碟上架 -->
    <SectionSong :h2Title="h2Title[1]" :songList="albumList"></SectionSong>

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
                :initial-index="0"
                ref="remarkCarusel"
                @change="rankChange"
              >
                <el-carousel-item
                  v-for="list in rankCourselList"
                  :key="list.id"
                  :name="list.title"
                >
                  <img v-lazy="list.imgUrl" alt="" />
                </el-carousel-item>
              </el-carousel>
            </div>
            <h3 class="rank-list-title">{{ rankTitle }}</h3>
            <p class="rank-list-time">每小时更新</p>
            <router-link to="play"
              ><div class="rank-list-play">
                <i class="iconfont icon-play"></i> 播放榜单
              </div></router-link
            >
          </div>
          <div class="rank-list-right">
            <!-- 滚动条 -->
            <div class="rank-list-right-scroll">
              <el-scrollbar class="scroll">
                <!-- 滚动条歌曲排行榜 -->
                <div
                  class="item-column"
                  v-for="(list, index) in hotSongList"
                  :key="list.id"
                  @click="getSongMessage(list)"
                >
                  <span class="item-num">{{ index + 1 }}</span>
                  <img class="item-img" v-lazy="list.al.picUrl" alt="" />

                  <span class="item-songname">{{ list.al.name }} </span>
                  <span class="item-singername">{{ list.ar[0].name }}</span>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐电台 -->
    <SectionSong
      :h2Title="h2Title[2]"
      :songList="personalizedList"
    ></SectionSong>
  </div>
</template>
<script>
import {
  reqGetBannerList,
  reqGetFourForKingKong,
  reqGetQuickPlayList,
  reqGetNewSong,
  reqGetAlbumList,
  reqPersonalized,
  reqGetHotTopSongs,
  reqGetRankCoursel,
} from "@api/home";
import { Loading } from "element-ui";
import SectionSong from "@comps/SectionSong";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      tabChangeList: [
        { title: "华语", topId: 21845217, active: true },
        { title: "欧美", topId: 2023401535, active: false },
        { title: "日语", topId: 60131, active: false },
      ],
      fourForKingKong: [],
      playList: [],
      playListImg: [],
      h2Title: ["新碟上架", "数字专辑", "推荐电台"],
      newSongList: [],
      albumList: [],
      personalizedList: [],
      // songId: null,
      hotSongList: [],
      rankCourselList: [],
      rankTitle: "热歌榜",
      songMessage: {},

      // isPlayButtonShow: false
    };
  },
  computed: {
    ...mapState({
      recommendPlayList: (state) => state.home.recommendPlayList,
    }),
  },
  methods: {
    /* 获取歌单 */
    async getRecommendList(index) {
      /**
       * 1.添加一整个歌单进去时播放第一首歌
       * 2.添加某一个歌单前把正在播放列表清空
       */
      // 清空isPlayingList列表
      this.$store.commit("CLEAR_IS_PLAYING_LIST");
      const { id } = this.recommendPlayList[index];

      const res = await reqGetQuickPlayList(id);
      const tracks = res.playlist.tracks;
      const songList = [];
      tracks.forEach((item) => {
        songList.push({
          id: item.id,
          pic: item.al.picUrl,
          singer: item.ar[0].name,
          song: item.name,
          album: item.al.name,
          time: item.dt,
          showPlay: true,
        });
      });

      this.$store.commit("ALL_SONG", { songList, id });
      // 播放列表中的第一首歌
      await this.getIsPlayingSong(songList[0]);
      this.addOneSong(songList[0]);
      // 改播放行的样式
      this.changeCheckedRowIndex(0);
      this.$router.push({
        name: "play",
      });
    },
    // tab切换
    tabChange(index) {
      this.tabChangeList.map((item) => {
        item.active = false;
      });
      this.tabChangeList[index].active = true;
      this.getQuickPlayList(this.tabChangeList[index].topId);
    },
    /* 鼠标移入图片显示效果 */
    hoverBigImg(index) {
      this.$set(this.recommendPlayList[index], "isPlayShow", true);
    },
    leaveBigImg(index) {
      this.$set(this.recommendPlayList[index], "isPlayShow", false);
    },
    /* 切换排行榜单 */
    async rankChange(index) {
      const { topListId, title } = this.rankCourselList[index];
      this.rankTitle = title;
      this.getHotList(topListId);
    },
    ...mapActions([
      "getRecommendPlayList",
      "changeCheckedRowIndex",
      "getIsPlayingSong",
      "addOneSong",
    ]),
    /* 新歌速递 */
    async getQuickPlayList(id) {
      const iDom = document.querySelector(".newsong-data-right");
      let loadingInstance = Loading.service({
        target: iDom,
        background: "#f2f2f2",
      });

      const resPlayListChinese = await reqGetQuickPlayList(id);
      this.playList = resPlayListChinese.playlist.tracks.splice(1, 8);

      this.playListImg = this.playList.slice(0, 6);
      this.$nextTick(() => {
        loadingInstance.close();
      });
    },
    /* 获取歌曲信息 */
    async getSongMessage(message) {
      /* if (e) {
        this.songId = e.target.getAttribute("id");
      } else {
        this.songId = id;
      } */

      this.songMessage = {
        id: message.id,
        pic: message.al.picUrl,
        singer: message.ar[0].name,
        song: message.name,
        album: message.al.name,
        time: message.dt,
        showPlay: true,
      };

      await this.getIsPlayingSong(this.songMessage);
      this.addOneSong(this.songMessage);
      // this.$store.commit("ONE_SONG", this.songMessage);
      /* this.$router.push({
        name: "play",
        query: {
          songId: id
        }
      }); */
      this.$router.push("play");
    },
    /* 移入事件 */
    songMouseEnter(list) {
      this.$set(list, "isPlayButtonShow", true);
      // console.log(list);

      // this.isPlayButtonShow = true;
    },
    /* 移出事件 */
    songMouseLeave(list) {
      this.$set(list, "isPlayButtonShow", false);
      // console.log(list);
    },
    async getHotList(id) {
      const iDom = document.querySelector(".rank-list-right-scroll");

      let loadingInstance = Loading.service({
        target: iDom,
        background: "#f2f2f2",
      });

      const resHotTopSongs = await reqGetHotTopSongs(id);
      // this.hotSongList = resHotTopSongs;
      this.hotSongList = resHotTopSongs.playlist.tracks.splice(1, 20);
      // loadingInstance.close();

      // 以服务的方式调用的 Loading 需要异步关闭
      this.$nextTick(() => {
        loadingInstance.close();
      });
    },
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
    /* 华语歌单 */
    this.getQuickPlayList(this.tabChangeList[0].topId);
    /* 新歌歌单 */
    const resNewSong = await reqGetNewSong();
    resNewSong.result.forEach((item) => {
      this.newSongList.push({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        singer: item.song.artists[0].name,
      });
    });
    /* 专辑 */
    const resAlbumList = await reqGetAlbumList();

    resAlbumList.albumProducts.forEach((item) => {
      this.albumList.push({
        id: item.albumId,
        name: item.albumName,
        picUrl: item.coverUrl,
        singer: item.artistName,
      });
    });
    /* 电台 */
    const resPersonalized = await reqPersonalized();
    resPersonalized.result.slice(0, 5).forEach((item) => {
      this.personalizedList.push({
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        singer: item.program.channels[0],
      });
    });
    /* 排行榜榜单 */
    this.getHotList();
    /* 排行榜轮播图 */
    const rankCoursel = await reqGetRankCoursel();
    this.rankCourselList = rankCoursel.rankList;
    /*  this.rankCourselList.forEach(item => {
      this.rankTitle.push({
        id: item.id,
        title: item.title
      });
    }); */
  },
  components: {
    SectionSong,
    // Carousel
  },
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
  margin-top: 56px;

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

        .container-right-item-showImg {
          position: absolute;
          width: 70px;
          height: 70px;
          z-index: 9999;
          left: 33%;
          top: 50%-25px;
        }

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

          transition: all 1.5s;
          &:hover {
            transform: scale(1.1);
          }
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
          line-height: 24px;
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
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    background: #fff;
    .tag-container {
      margin: 0 auto;
      width: 1400px - 340px;
      padding-left: 340px;
      .hoverchange {
        margin-left: 26px;
        line-height: 60px;
        &:hover {
          cursor: pointer;
          color: #fd3f7f;
        }
        &.active {
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
        position: relative;
        margin-bottom: 15px;
        box-sizing: border-box;
        padding: 0 22px;
        display: flex;
        font-size: 14px;
        border-radius: 10px;

        // 移入显示图片
        .data-right-item-show {
          position: absolute;
          top: 20px;
          left: 40px;
          display: flex;
          .data-right-item-show-img {
            img {
              width: 40px;
              height: 40px;
              cursor: pointer;
              // background: yellow;
            }
          }
        }
        .data-right-item-show-icon {
          position: absolute;
          top: 20px;
          right: 40px;
          text-align: center;
          line-height: 44px;
          .iconfont {
            font-size: 18px;
            padding: 0 20px;
            &:hover {
              cursor: pointer;
              color: #e91e63;
            }
          }
        }
        .data-right-item-img-container {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 10px;
          .data-right-item-img {
            cursor: pointer;
            border-radius: 10px;
            width: 80px;
            height: 80px;
            transition: all 0.8s;
          }
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
          .data-right-item-content-name1:hover {
            cursor: pointer;
            color: #e91e63;
          }
          .data-right-item-content-name2 {
            color: rgba(51, 51, 51, 0.4);
            &:hover {
              cursor: pointer;
              color: #e91e63;
            }
          }
        }
        .data-right-item-time {
          color: rgba(51, 51, 51, 0.4);
          line-height: 80px;
        }
        &:hover {
          background: #e6e6e6;
        }
        &:hover .data-right-item-img {
          transform: scale(1.3);
          transition: all 1.5s;
        }
      }
    }
  }
}
.home-bannerList {
  width: 84%;
  margin: 0 auto;
  /deep/ .el-carousel__item--card {
    margin-left: -304px;
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
          border-radius: 10px;
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
