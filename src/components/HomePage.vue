i
<template>
    <div class="cb_home-page-main-content">
        <div class="firstHeader">
            <h3>OUR HONURABLE TEACHERS</h3>
        </div>
        <el-row class="loadImgHome" v-if="isLoading">
            <el-col :span="24">
                <div class="grid-content bg-purple-light">
                    <img src="@/assets/loader.gif" alt="">
                </div>
            </el-col>
        </el-row>
        <el-row style="display: flex; flex-wrap: wrap;">
            <el-col class="cardBodyMain" :span="6" v-for="(t, index) in teachers" :key="index">
                <el-card class="cardBody" :body-style="{ padding: '0px' }">
                    <img :src="t.imageUrl" class="image">
                    <div style="padding: 14px;">
                        <span>{{t.name}}</span>
                        <p>Subject:{{t.subject}}</p>
                        <div class="bottom clearfix">
                            <time class="time">{{ t.time }}</time>
                            <el-button
                                :disabled="!userIsAuthenticated"
                                type="text"
                                class="button"
                                @click="toRouteTeacher(t.teachersid)"
                            >View</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "HomePage",
  data() {
    return {
      inputSearch: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getloadingState;
    },
    teachers() {
      return this.$store.getters.allTeachers;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    uploadData() {
      return this.$store.dispatch("uploadFirebase", "shamim");
    },
    gotoTeacher(teacherID) {
      this.$store.dispatch("teachersPage", teacherID);
    },
    toRouteTeacher(teacherID) {
      let path = "/teacher/" + teacherID;
      this.$router.push(path);
      this.gotoTeacher(teacherID);
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}
.cardBody {
  font-family: monospace;
  font-size: 14px;
  line-height: 9px;
  max-width: 244px;
  margin-bottom: 74px;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.firstHeader h3 {
  padding-bottom: 0px;
  margin-bottom: 42px;
  color: darkred;
  font-family: monospace;
  text-align: center;
  text-decoration: underline;
  font-size: 28px;
}
.clearfix:after {
  clear: both;
}
.el-input-group--append .el-input__inner,
.el-input-group__prepend {
  height: 29px;
}
.el-col-6 {
  width: 25%;
  min-width: 143px;
}
.loadImgHome {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 26%;
}
.el-card__body img.image {
  min-height: 244px !important;
  max-height: 244px !important;
}
.cb_home-page-main-content {
  padding: 20px 20px 20px 70px;
}
@media screen and (max-width: 1047px) and (min-width: 960px) {
 .cb_home-page-main-content {
    padding: 0px;
  }
}
</style>
