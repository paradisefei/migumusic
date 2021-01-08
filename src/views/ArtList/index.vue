<template>
  <div class="container">
    <!-- 过滤选项 -->
    <div class="filters w">
      <div class="filters-1">
        <div
          class="filters-item "
          :class="item.isShow ? 'active' : ''"
          v-for="(item, index) in language"
          :key="index"
          @click="handleChick($event, index)"
          :data-type="item.type"
        >
          {{ item.type }}
        </div>
      </div>
      <div class="filters-2">
        <div
          class="filters-item "
          :class="item.isShow ? 'active' : ''"
          v-for="(item, index) in sex"
          :key="index"
          @click="handleChick($event, index)"
          :data-type="item.type"
        >
          {{ item.type }}
        </div>
      </div>
      <div class="filters-3">
        <div
          class="filters-item "
          :class="item.isShow ? 'active' : ''"
          v-for="(item, index) in charcode"
          :key="index"
          @click="handleChick($event, index)"
          :data-type="item.type"
        >
          {{ item.type }}
        </div>
      </div>
    </div>
    <!-- 展示人物 -->
    <div class="person w">
      <div class="person-item" v-for="item in artists" :key="item.id">
        <div class="item-content" @click.capture="searchPerson" :data-name="item.name">
          <img class="" v-lazy="item.picUrl" alt="" :data-name="item.name" />
          <p class="item-text" :data-name="item.name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//   /search?keywords=薛之谦&type=1000
import { reqGetArtList, reqSearchArtName } from "@api/artlist";

export default {
  name: "ArtList",
  data() {
    return {
      language: [
        {
          type: "华语",
          isShow: true,
          area: 7
        },
        {
          type: "欧美",
          area: 96
        },
        {
          type: "日韩",
          area: 8
        }
      ],
      sex: [
        {
          type: "男",
          isShow: true,
          class: 1
        },
        {
          type: "女",
          class: 2
        },
        {
          type: "组合",
          class: 3
        }
      ],
      charcode: [{ type: "热门", isShow: true }],
      keywords: {
        area: 7,
        type: 1,
        initial: "-1"
      },
      artists: []
    };
  },
  methods: {
    getAtoZ() {
      for (var i = 0; i < 26; i++) {
        const res = String.fromCharCode(65 + i);
        this.charcode.push({ type: res });
      }
    },
    /* 点击过滤事件 */
    handleChick(e, index) {
      /* 得到点击的type值 */
      const type = e.target.getAttribute("data-type");

      /* 查找是语言列表 */
      const isLanguage = this.language.find(item => item.type === type);
      //   重复点击返回
      //   if (isLanguage.area === this.keywords.area) return;
      /* 如果是语言 */
      if (isLanguage) {
        /* 加入响应式 */

        this.language.map(item => {
          this.$set(item, "isShow", false);
          item.isShow = false;
        });

        this.language[index].isShow = true;
        this.keywords.area = isLanguage.area;
        console.log(this.keywords);

        // 发送请求

        this.getArtList();

        return;
      }

      /* 查找性别 */
      const isSex = this.sex.find(item => item.type === type);
      //   if (isSex.class === this.keywords.type) return;
      /* 如果是性别 */
      if (isSex) {
        /* 加入响应式 */
        this.sex.map(item => {
          this.$set(item, "isShow", false);
          item.isShow = false;
        });

        this.sex[index].isShow = true;
        this.keywords.type = isSex.class;
        this.getArtList();
        return;
      }

      /* 查找字母 */
      const isCode = this.charcode.find(item => item.type === type);

      console.log(isCode);
      /* 如果是字母 */
      if (isCode) {
        /* 加入响应式 */
        this.charcode.map(item => {
          this.$set(item, "isShow", false);
          item.isShow = false;
        });
        // 热门传-1
        this.charcode[index].isShow = true;
        if (isCode.type === "热门") {
          this.keywords.initial = -1;
        } else {
          this.keywords.initial = isCode.type;
        }
        this.getArtList();
        console.log(this.keywords);
      }
    },
    /* 获取歌曲 */
    async getArtList() {
      const { type, area, initial } = this.keywords;
      const res = await reqGetArtList(type, area, initial);
      this.artists = [];
      res.artists.forEach(item => {
        this.artists.push({
          name: item.name,
          picUrl: item.picUrl,
          id: item.id
        });
      });
    },
    // 点击图片搜索
    async searchPerson(e) {
      const name = e.target.getAttribute("data-name");
      const res = await reqSearchArtName(name);
      console.log(res);

      if (res.code === 200) {
        const songs = res.result.playlists;

        const playList = [];
        songs.forEach(item => {
          const { track } = item;
          playList.push({
            id: track.id,
            song: track.name,
            /* 搜索返回只有默认图片  没有歌曲信息的图片*/
            picUrl: item.coverImgUrl,
            singer: track.artists[0].name,
            time: track.duration,
            album: track.album.name
          });
        });

        this.$store.commit("SEARCH_SONG", playList);

        this.$router.push({
          name: "play"
        });
      }
    }
  },
  created() {
    this.getAtoZ();
    this.getArtList();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
* {
  font-size: 14px;
}
.w {
  width: 1400px;
  margin: 0 auto;
}

.filters {
  height: 124px;

  margin: 30px auto;
  .filters-1 {
    height: 26px;

    display: flex;
  }
  .filters-2 {
    height: 26px;
    margin-top: 23px;

    display: flex;
  }
  .filters-3 {
    height: 26px;
    margin-top: 23px;

    display: flex;
    div {
      padding: 0 16px;
    }
  }
}
.filters-item {
  margin-left: 5px;
  padding: 0 12px;
  cursor: pointer;
  line-height: 26px;
}
.active {
  background: #e91e63;
  border-radius: 26px;
  color: white;
}
.person {
  display: flex;
  flex-wrap: wrap;
  .person-item {
    width: 233px;
    height: 233px;
    background: #f8f8f8;
    box-sizing: border-box;
    border: 8px solid white;
    &:hover {
      color: #e91e63;
      background: #eeeeee;
      transition: all 0.3s;
    }
    .item-content {
      width: 136px;
      height: 136px;
      margin: 0 auto;
      cursor: pointer;
      img {
        margin-top: 20px;
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
      .item-text {
        text-align: center;
        margin-top: 6px;
      }
    }
  }
}
</style>
