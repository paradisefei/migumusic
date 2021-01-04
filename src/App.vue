<template>
  <div id="app">
    <Home />
    <Migulist />
    <router-view> </router-view>
  </div>
</template>

<script>
import Home from "./views/Home/index";
import Migulist from "./views/Migulist/Migulist";
export default {
  name: "app",
  components: {
    Home,
    Migulist,
  },
};
</script>

<style>
</style>
