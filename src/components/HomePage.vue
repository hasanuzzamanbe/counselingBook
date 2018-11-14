i
<template>
    <div style="padding: 20px;    padding-left: 70px; max-width:1785px">
        <div class="firstHeader">
            <h3>OUR HONURABLE TEACHERS</h3>
        </div>
        <el-row style="margin-bottom:20px; padding-right: 61px;">
            <el-col :span="6" style="float:right">
                <el-input
                    placeholder="Please input for search"
                    v-model="inputSearch"
                    class="input-with-select"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" v-for="(t, index) in teachers" :key="index">
                <el-card class="cardBody" :body-style="{ padding: '0px' }">
                    <img :src="t.imageUrl" class="image">
                    <div style="padding: 14px;">
                        <span>{{t.name}}</span>
                        <p>Subject:{{t.subject}}</p>
                        <div class="bottom clearfix">
                            <time class="time">{{ t.time }}</time>
                            <el-button type="text" class="button">Register</el-button>
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
      inputSearch: "",
      teachers: [
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Johurul Haque",
          subject: "English",
          time: "10 am to 5 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Md. batin sheikh",
          subject: "Physics",
          time: "10 am to 3 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Dr. Azgor ali",
          subject: "Economics",
          time: "10 am to 5 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Shoriful Islam",
          subject: "statistic",
          time: "10 am to 5 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Johurul Haque",
          subject: "English",
          time: "10 am to 5 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Md. batin sheikh",
          subject: "Physics",
          time: "10 am to 3 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Dr. Azgor ali",
          subject: "Economics",
          time: "10 am to 5 pm"
        },
        {
          imageUrl:
            "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
          name: "Shoriful Islam",
          subject: "statistic",
          time: "10 am to 5 pm"
        }
      ],
      currentDate: new Date()
    };
  },
  methods: {
    uploadData() {
      this.$store.dispatch("uploadFirebase", "shamim");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  font-size: 17px;
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
</style>
