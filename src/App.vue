<template>
  <div id="app">
    <div v-if="!showPlay">
      <BigHeader></BigHeader>
      <router-view></router-view>
      <Footer></Footer>
    </div>
    <div v-else style="height:100%">
      <Play></Play>
    </div>
  </div>
</template>

<script>
import BigHeader from "./views/BigHeader";
import Footer from "@comps/Footer/Footer.vue";
import Play from "@views/Play";
export default {
  name: "app",
  data() {
    return {
      showPlay: false,
    };
  },
  watch: {
    $route() {
      this.showPlay = this.$route.meta.showPlay
    },
  },
  components: {
    BigHeader,
    Footer,
    Play
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
