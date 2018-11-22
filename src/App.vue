<template>
    <div id="app" style="max-width:1785px;margin-top: -23px;">
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
.loadImgHome {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 26%;
}
</style>
