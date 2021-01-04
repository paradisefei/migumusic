<template>
  <div id="app">
    <Home />

    <router-view> </router-view>
  </div>
</template>

<script>
import Home from "./views/Home/index";
export default {
  name: "app",
  components: {
    Home,
  },
};
</script>

<style>
</style>
