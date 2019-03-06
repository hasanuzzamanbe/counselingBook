<template>
    <div id="app" style="margin-top: -23px;">
        <AppHeader/>
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>
        <AppFooter></AppFooter>
    </div>
</template>

<script>
import AppHeader from "@/components/header.vue";
import AppFooter from "@/components/footer.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style>
  .cardBodyMain {
    width: 25%;
    min-width: 228px !important;
  }
#app {
  background: #fbfafa;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: -5px;
  padding-top: 23px;
}
@media only screen and (min-width: 600px) {
  .mainDivTemplate {
    padding-right: 106px;
    padding-left: 106px;
    padding-top: 16px;
  }
}
.el-carousel__container {
  background: #1d545acf;
}
.loadImgHome {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 26%;
}
</style>
