<template>
  <div>
    <Header />
    <NavBar />
    <Footer />
  </div>
</template>

<script>
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
export default {
  name: "Home",
  computed: {},
  methods: {},
  mounted() {},
  components: {
    Header,
    NavBar,
    Footer
  },
};
</script>

<style lang="less" scoped>
</style>