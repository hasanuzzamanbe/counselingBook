<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-menu>
                    <el-submenu index="1" v-if="userIsAuthenticated">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">Profile</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="profilePage">User details</el-menu-item>
                            <el-menu-item index="1-2" @click="onLogOut">Log-out</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2" @click="TeachersPage">
                        <i class="el-icon-menu"></i>
                        <span slot="title">Teachers</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="Schedules" v-if="userIsAuthenticated">
                        <i class="el-icon-document"></i>
                        <span slot="title">My Schedules</span>
                    </el-menu-item>
                    <el-menu-item index="4" v-if="!userIsAuthenticated" @click="SignInPage">
                        <i class="el-icon-setting"></i>
                        <span slot="title">sign In</span>
                    </el-menu-item>
                    <el-menu-item index="5" v-if="!userIsAuthenticated" @click="SignUpPage">
                        <i class="el-icon-setting"></i>
                        <span slot="title">sign up</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="18">
                <img src="@/assets/caroseul1c.jpg" alt="">
            </el-col>
        </el-row>
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
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogOut() {
      this.$store.dispatch("logout");
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
</style>
