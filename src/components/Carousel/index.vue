<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";

import "swiper/swiper-bundle.css";

Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  data() {
    return {
      //   url: "//cdnmusic.migu.cn/tycms_picture/21/01/01/21010112552989_1400x350_857.jpg"
    };
  },
  props: {
    carouselList: {
      type: Array,
      required: true
    }
  },
  watch: {
    carouselList() {
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    }
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(this.$refs.swiper, {
        parallax: true
      });
    }
  },
  mounted() {
    if (!this.carouselList.length) return;
    this.initSwiper();
  }
};
</script>

<style lang="less" scoped></style>
