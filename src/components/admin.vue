<template>
    <div style="padding:120px">
        <h3>Admin page :</h3>
        <h4>Add a teacher (admin only)</h4>
        <hr>
        <div v-if="userIsAdmin">
            <p class="howToAdd">
                To add a teacher at first you have to sign up from the teachers email id, Or teacher can easily sign up from his/her account.
                Then You have to check in user account database to get the teacher Id key.
                Just fill the form bellow ant put the user id key to the teacher Id input field.
            </p>
            <el-input type="text" v-model="teacher.name" placeholder="Enter teacher Name"></el-input>
            <el-input
                type="text"
                v-model="teacher.teachersid"
                placeholder="Enter teacher Id(get from user account)"
            ></el-input>
            <el-input type="text" v-model="teacher.subject" placeholder="Enter teacher Subject"></el-input>
            <el-input type="text" v-model="teacher.time" placeholder="Enter teacher time"></el-input>
            <el-input type="text" v-model="teacher.message" placeholder="Enter teacher Message"></el-input>
        </div>
        <el-button
            v-if="userIsAdmin"
            type="success"
            size="small"
            @click="AddTeacher"
            :disabled="!isformValid"
        >Add Teacher</el-button>
        <div v-if="!userIsAdmin">
            <h2 style="color:red">This Page is only alowed for Admin, You are not an admin</h2>
            <el-button @click="goBack">please go back</el-button>
        </div>
    </div>
</template>
<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      teacher: {
        teachersid: "",
        name: "",
        subject: "",
        time: "",
        message: "",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png"
      }
    };
  },
  computed: {
    userIsAdmin() {
      let user = this.$store.getters.userId;
      return (
        user === "pla7sKRCuIRdzgDvg4lvr4wvBO13" ||
        user === "KPybU05hj8N6PKNm5tWk8fOnbpD3" ||
        user === "GMI3j08o6mZBCu3dXq58jET8OTP2"
      );
    },

    isformValid() {
      return (
        this.teacher.teachersid !== "" &&
        this.teacher.name !== "" &&
        this.teacher.message !== "" &&
        this.teacher.subject !== "" &&
        this.teacher.time !== ""
      );
    }
  },
  methods: {
    succesAlert() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success"
      });
    },

    AddTeacher() {
      this.$store.dispatch("addTeacher", this.teacher);
      this.succesAlert();
      this.teacher = {};
      this.teacher.imageUrl =
        "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png";
    },

    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style>
p.howToAdd {
  color: blue;
  font-family: monospace;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 53px;
}
input.el-input__inner {
  margin-bottom: 14px;
}
</style>
