import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import Teacher from "@/components/teacherspage";
import Profile from "@/user/profile";
import SignIN from "@/user/signin";
import SignUp from "@/user/signup";
import Admin from "@/components/admin";
import Schedules from "@/components/schedules";
import Messages from "@/components/messages.vue";

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
    },
    {
      path: "/signin",
      name: "SignIN",
      component: SignIN
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/schedules/:STDID",
      name: "Schedules",
      component: Schedules
    },
    {
      path: "/adminpanel",
      name: "adminpanel",
      component: Admin
    },
    {
      path: "/messages",
      name: "Messages",
      component: Messages
    }
  ]
});
