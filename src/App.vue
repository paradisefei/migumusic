<template>
  <div id="app">
    <BigHeader></BigHeader>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import BigHeader from "./views/BigHeader";
import Footer from "@comps/Footer/Footer.vue";
export default {
  name: "app",
  components: {
    BigHeader,
    Footer,
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
