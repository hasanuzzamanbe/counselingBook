// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import { store } from "./store";
import * as firebase from "firebase";

import locale from "element-ui/lib/locale/lang/en";

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created() {
    var firebase = require("firebase");
    firebase.initializeApp({
      apiKey: "AIzaSyCNPSYZ-yrGpNTwg9mHzPo2xBOtLncQAMw",
      authDomain: "student-10c1b.firebaseapp.com",
      databaseURL: "https://student-10c1b.firebaseio.com",
      projectId: "student-10c1b",
      storageBucket: "",
      messagingSenderId: "595310467884"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("loadData");
    this.$store.dispatch("loadDataOfTeacher");
  }
});
