<template>
    <div>
        <el-menu
            class="stickymenu"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item index="1" @click="TeachersPage">All Teachers</el-menu-item>
            <el-menu-item index="1-1" @click="adminonly" v-if="userIsAdmin">Admin Panel</el-menu-item>
            <el-menu-item index="5" v-if="userIsAdmin" @click="Messages">Messages</el-menu-item>
            <el-menu-item
                index="3"
                @click="Schedules"
                v-if="userIsAuthenticated && !isUserTeacher && !userIsAdmin"
            >
                <i class="el-icon-document"></i>
                <span slot="title">My Schedules</span>
            </el-menu-item>
            <el-menu-item
                index="1-4"
                @click="MyDashboard"
                v-if="userIsAuthenticated && isUserTeacher"
            >
                <i class="el-icon-document"></i>
                <span slot="title">My Dashboard</span>
            </el-menu-item>
            <el-menu-item
                index="1-2"
                @click="onLogOut"
                v-if="userIsAuthenticated"
                style="float: right;"
            >Log-out</el-menu-item>
            <el-menu-item
                index="1"
                v-if="!userIsAuthenticated"
                @click="SignUpPage"
                style="float: right;"
            >Sign Up</el-menu-item>
            <el-menu-item
                index="12"
                v-if="!userIsAuthenticated"
                @click="SignInPage"
                style="float: right;"
            >Login</el-menu-item>
            <!-- <el-submenu index="2">
                <template slot="title">Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
            </el-submenu>-->
        </el-menu>
        <el-carousel :interval="5000" arrow="always" height="400px">
            <el-carousel-item>
                <div class="caroInnerText">
                    <h3>Book Your Schedule</h3>
                    <p>Teachers are available to help you</p>
                    <p v-if="!userIsAuthenticated">
                        Didn't registered yet ? please
                        <span>
                            <el-button
                                @click="SignUpPage"
                                type="success"
                                size="mini"
                                style="background-color: #409eff21;"
                                class="signUpCaro"
                            >sign up</el-button>
                        </span>
                    </p>
                </div>
                <img style="min-width: 100%;" src="@/assets/headerimg.jpg" alt="">
            </el-carousel-item>
            <el-carousel-item>
                <div class="caroInnerText">
                    <h3>Book Your Schedule</h3>
                    <p>Teachers are available to help you</p>
                    <p v-if="!userIsAuthenticated">
                        Already have an account ? please
                        <span>
                            <el-button
                                class="logInCaro"
                                @click="SignInPage"
                                type="primary"
                                style="background-color: #409eff21;"
                                size="mini"
                            >Log In</el-button>
                        </span>
                    </p>
                </div>
                <img style="min-width: 100%;" src="@/assets/caroseul1c.jpg" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
  props: ["ID"],
  data() {
    return {
      STDID: "",
      tabPosition: "left"
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getloadingState;
    },
    isUserTeacher() {
      let getuser = this.$store.getters.userId;
      let allteachers = this.$store.getters.allTeachers;
      let teacher = false;
      allteachers.find(data => {
        if (getuser === data.teachersid) {
          teacher = true;
        }
      });
      return teacher;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsAdmin() {
      let user = this.$store.getters.user;
      let Alladmin = this.$store.getters.getAdmins;
      if (user) {
        if (Alladmin.indexOf(user.id) > -1) {
          return true;
        }
      }
    }
  },

  methods: {
    adminonly() {
      this.$router.push("/adminpanel");
    },
    onLogOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    TeachersPage() {
      this.$router.push("/");
    },
    SignInPage() {
      this.$router.push("/signin");
    },
    SignUpPage() {
      this.$router.push("/signup");
    },
    profilePage() {
      this.$router.push("/profile");
    },
    Schedules() {
      this.STDID = this.$store.getters.user.id;
      let path = "/schedules/" + this.STDID;
      this.$router.push(path);
    },
    MyDashboard() {
      let getuserId = this.$store.getters.userId;
      let path = "/teacher/" + getuserId;
      this.$router.push(path);
    },
    Messages() {
      this.$router.push("/messages");
    }
  }
};
</script>
<style scoped>
.el-tabs__nav.is-left div:hover {
  transition-duration: 1s;
  font-weight: bold;
  color: #e6a23c;
}
.el-tabs__content {
  color: darkred;
  font-family: cursive;
}
.el-menu {
  background-color: #fbfafa;
}
.caroInnerText {
  position: absolute;
  margin-top: 110px;
  margin-left: 208px;
  color: white;
  font-family: serif;
  font-size: 20px;
}
.caroInnerText h3 {
  font-size: 3vw;
}

@media only screen and (max-width: 600px) {
  .caroInnerText {
    margin-left: 58px;
  }
  .caroInnerText h3 {
    font-size: 1.17em;
  }
}
.logInCaro:hover {
  background-color: rgb(60, 86, 235) !important;
}
.signUpCaro:hover {
  background-color: rgb(64, 216, 59) !important;
}
</style>
