<template>
  <div>
    <Header />
    <NavBar v-show="!hideNavBar"/>
  </div>
</template>

<script>
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";

export default {
  name: "BigHeader",
  data() {
    return {
      hideNavBar: false,
    }
  },
  computed: {},
  methods: {},
  watch: {
    $route() {
      console.log(this.$route);
      this.hideNavBar = this.$route.meta.hideNavBar;
    }
  },
  mounted() {},
  components: {
    Header,
    NavBar,
  },
};
</script>

<style lang="less" scoped>
</style>