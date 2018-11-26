<template>
    <div class="mainDiv">
        <h2 v-if="userIsAdmin" style="color:red;text-decoration:underline">Admin page :</h2>
        <h4 v-if="userIsAdmin">Settings:</h4>
        <hr>
        <div v-if="userIsAdmin">
            <el-row>
                <p style="text-decoration:underline">Profile Edit limitation:</p>
                <p
                    class="howToAdd"
                >please enter the day in number that a teacher can edit their profile after that day of previous edit</p>
                <el-input
                    type="number"
                    size="mini"
                    placeholder="No of"
                    v-model="minDayOfEdit"
                    max="100"
                    min="-1"
                    style=" max-width:100px"
                ></el-input>Days
                <el-button type="primary" @click="submitMinDay" size="mini">Update</el-button>
            </el-row>
            <el-row style="margin-top: 12px;">clear limitation (Can edit as many as wish)
                <el-button @click="nolimit" type="warning" size="mini">clear</el-button>
            </el-row>
        </div>
        <h4 style="margin-top:43px" v-if="userIsAdmin">Add a teacher (admin only)</h4>
        <hr v-if="userIsAdmin">
        <div v-if="userIsAdmin">
            <p
                class="howToAdd"
            >Requested teachers are showing bellow , You can approve as a teacher or cancel his/her request</p>
        </div>
        <el-row
            v-if="userIsAdmin"
            class="teacherDetailRow"
            v-for="teacher in loadApprovalstec"
            :key="teacher.teachersid"
        >
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <h3>{{teacher.name}}</h3>
                    <p>Subject: {{teacher.subject}}</p>
                    <p>Available time:{{teacher.time}}</p>
                    <p>Mail address: {{teacher.mail}}</p>
                </div>
            </el-col>
            <el-col :span="8" style="margin-top: 23px;">
                <p>
                    <span>{{teacher.name}}</span>-Requested as Techer
                </p>
                <el-button-group style="margin-bottom: 12px;">
                    <el-button
                        type="success"
                        size="small"
                        @click="Approve(teacher.teachersid)"
                    >Approve</el-button>
                    <el-button
                        type="warning"
                        size="small"
                        @click="Cancel(teacher.teachersid)"
                    >cancel</el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <div v-if="!userIsAdmin">
            <h2 style="color:red">This Page is only alowed for Admin, You are not an admin</h2>
            <el-button @click="goBack">please go back</el-button>
        </div>
        <hr style="margin-top:50px">
        <div v-if="userIsAdmin">
            <h3>Add another admin</h3>
            <p
                class="howToAdd"
            >The requested admin are listed bellow add as a new admin or cancel his/her request</p>
        </div>
        <el-button
            v-if="userIsAdmin"
            @click="adminmodal=true"
            style="margin-bottom:32px"
        >Add an Admin +</el-button>
        <el-dialog :visible.sync="adminmodal" v-if="adminmodal">
            <el-row>
                <p class="notifySignUp">
                    <i class="el-icon-info"></i>
                    Your account will create as default user. And a request will send to the admins
                    If admin approve you as a admin,
                    <br>Then your account will be upgrated to admins account
                </p>
                <el-col :span="16">
                    <el-form
                        style="margin-bottom: 60px;"
                        :model="teacherData"
                        status-icon
                        ref="teacherData"
                        label-width="120px"
                    >
                        <el-form-item label="Name">
                            <el-input
                                v-model="teacherData.name"
                                placeholder="Enter your Full Name"
                                type="text"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input
                                v-model.number="teacherData.mail"
                                placeholder="Enter your email address"
                                type="email"
                            ></el-input>
                            <span
                                v-if="!mailvalidated && !mailBoxnotEmpty"
                                style="
                                  font-size: 12px;
                                  color: #f56c6c;
                                  margin-left: 1px;
                                  position: absolute;
                                  margin-top: -12px;
                             "
                            >*please input a valid email address (required)</span>
                        </el-form-item>
                        <el-form-item label="Password" prop="pass">
                            <el-input
                                type="password"
                                v-model="teacherData.pass"
                                autocomplete="off"
                                placeholder="Enter a password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm" prop="checkPass">
                            <el-input
                                type="password"
                                v-model="teacherData.checkPass"
                                autocomplete="off"
                                placeholder="re-enter your password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="onSignUpAdmin()"
                                size="small"
                                :disabled="!mailvalidated || !passValidateAdmin"
                            >Sign Up</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
        <el-row
            v-if="userIsAdmin"
            class="AdminDetailRow"
            v-for="admin in loadApprovalsAdmin"
            :key="admin.adminid"
        >
            <el-col :span="16">
                <div class="grid-content bg-purple">
                    <h3>{{admin.name}}</h3>
                    <p>Mail:{{admin.mail}}</p>
                </div>
            </el-col>
            <el-col :span="8" style="margin-top: 23px;">
                <p>
                    <span>{{admin.name}}</span>-Requested as Admin
                </p>
                <el-button-group style="margin-bottom: 12px;">
                    <el-button
                        type="success"
                        size="small"
                        @click="ApproveAdmin(admin.adminid)"
                    >Approve Admin</el-button>
                    <el-button
                        type="warning"
                        size="small"
                        @click="CancelAdmin(admin.adminid)"
                    >cancel Admin</el-button>
                </el-button-group>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      minDayOfEdit: "",
      adminmodal: false,
      teacherData: {
        name: "",
        mail: "",
        pass: "",
        checkPass: ""
      },
      userIsAdmin: false
    };
  },
  computed: {
    mailvalidated() {
      return this.validateEmail(this.teacherData.mail);
    },
    mailvalidatedForgotPass() {
      return this.validateEmail(this.forgotPassMail);
    },
    mailBoxnotEmpty() {
      return this.teacherData.mail !== " ";
    },
    user() {
      return this.$store.getters.user;
    },
    passValidateAdmin() {
      return (
        this.teacherData.pass !== "" &&
        this.teacherData.pass.length >= 6 &&
        this.teacherData.pass === this.teacherData.checkPass &&
        this.teacherData.name !== ""
      );
    },
    loadApprovalstec() {
      return this.$store.getters.loadApprovalstec;
    },
    loadApprovalsAdmin() {
      return this.$store.getters.loadApprovalsAdmin;
    }
  },
  mounted: function(value) {
    let user = this.$store.getters.user;
    let Alladmin = this.$store.getters.getAdmins;
    if (user) {
      if (Alladmin.indexOf(user.id) > -1) {
        return (this.userIsAdmin = true);
      }
    }
  },
  beforeUpdate: function(value) {
    let user = this.$store.getters.user;
    let Alladmin = this.$store.getters.getAdmins;
    if (user) {
      if (Alladmin.indexOf(user.id) > -1) {
        return (this.userIsAdmin = true);
      }
    }
  },

  methods: {
    nolimit() {
      this.minDayOfEdit = -1;
      this.submitMinDay();
    },
    onSignUpAdmin() {
      this.$store.dispatch("signUserUpadmin", {
        name: this.teacherData.name,
        mail: this.teacherData.mail,
        pass: this.teacherData.pass
      });
    },
    submitMinDay() {
      firebase
        .database()
        .ref("minEditTime")
        .set(this.minDayOfEdit)
        .then(data => {
          alert("updated");
        });
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    },
    succesAlert() {
      this.$notify({
        title: "Success",
        message: "This is a success message",
        type: "success"
      });
    },
    ApproveAdmin(id) {
      let path = "";
      let admins = this.$store.getters.getDataOnapproveWithKey;
      admins.find(data => {
        for (let k in data) {
          if (data[k].adminid === id) {
            path = k;
            firebase
              .database()
              .ref("admins")
              .push(data[k].adminid)
              .then(data => {
                let location = "approvalAdmin" + "/" + path;
                let firebaseRef = firebase.database().ref(location);
                firebaseRef.remove();
                alert("Added success");
              });
          }
        }
      });
      let locData = "";
      admins.find(data => {
        for (let k in data) {
          if (data[k].adminid === id) {
            return (locData = data[k]);
          }
        }
      });
      let index = this.loadApprovalsAdmin.indexOf(locData);
      this.loadApprovalsAdmin.splice(index, 1);
    },
    CancelAdmin(id) {
      let path = "";
      let admins = this.$store.getters.getDataOnapproveWithKey;
      admins.find(data => {
        for (let k in data) {
          if (data[k].adminid === id) {
            return (path = k);
          }
        }
      });
      let location = "approvalAdmin" + "/" + path;
      let firebaseRef = firebase.database().ref(location);
      firebaseRef.remove().then(() => {
        alert("canceled and removed request");
      });
      //deleting locally
      let locData = "";
      admins.find(data => {
        for (let k in data) {
          if (data[k].adminid === id) {
            return (locData = data[k]);
          }
        }
      });
      let index = this.loadApprovalsAdmin.indexOf(locData);
      this.loadApprovalsAdmin.splice(index, 1);
    },
    ///approval for teacher
    Approve(id) {
      let path = "";
      let teachers = this.$store.getters.getDataOnapproveWithKeyTec;

      teachers.find(data => {
        for (let k in data) {
          if (data[k].teachersid === id) {
            path = k;
            firebase
              .database()
              .ref("teachers")
              .push(data[k])
              .then(data => {
                let location = "approval" + "/" + path;
                let firebaseRef = firebase.database().ref(location);
                firebaseRef.remove();
                alert("Added success");
              });
          }
        }
      });
      let locData = "";
      teachers.find(data => {
        for (let k in data) {
          if (data[k].teachersid === id) {
            return (locData = data[k]);
          }
        }
      });
      let index = this.loadApprovalstec.indexOf(locData);
      this.loadApprovalstec.splice(index, 1);
    },
    Cancel(id) {
      let path = "";
      let teachers = this.$store.getters.getDataOnapproveWithKeyTec;

      teachers.find(data => {
        for (let k in data) {
          if (data[k].teachersid === id) {
            path = k;
            let location = "approval" + "/" + path;
            let firebaseRef = firebase.database().ref(location);
            firebaseRef.remove().then(() => {
              alert("canceled and removed request");
            });
          }
        }
      });
      let locData = "";
      teachers.find(data => {
        for (let k in data) {
          if (data[k].teachersid === id) {
            return (locData = data[k]);
          }
        }
      });
      let index = this.loadApprovalstec.indexOf(locData);
      this.loadApprovalstec.splice(index, 1);
    },
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
p.howToAdd {
  color: blue;
  font-family: monospace;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 22px;
}
input.el-input__inner {
  margin-bottom: 14px;
}
.teacherDetailRow.el-row {
  background-color: #25a8b538;
  border-radius: 12px;
  box-shadow: 2px 2px 2px;
  margin-bottom: 23px;
}

@media only screen and (min-width: 600px) {
  .teacherDetailRow.el-row {
    padding-left: 43px;
    padding-bottom: 22px;
    margin-bottom: 23px;
  }
  .AdminDetailRow.el-row {
    padding-left: 43px;
    padding-bottom: 22px;
    margin-bottom: 23px;
  }
  .mainDiv {
    padding: 120px;
  }
}
.AdminDetailRow.el-row {
  background-color: #da1f1fe6;
  color: white;
  border-radius: 12px;
  box-shadow: 2px 2px 2px black;
  margin-bottom: 23px;
}
button.el-button {
  border-radius: 12px;
}
</style>
