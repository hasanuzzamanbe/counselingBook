import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Teacher from "@/components/teacherspage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/teacher/:ID",
      name: "Teacher",
      component: Teacher,
      props: true
    }
  ]
});
