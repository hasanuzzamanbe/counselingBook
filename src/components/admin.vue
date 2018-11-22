<template>
    <div class="mainDiv">
        <h3>Admin page :</h3>
        <h4>Add a teacher (admin only)</h4>
        <hr>
        <div v-if="userIsAdmin">
            <p
                class="howToAdd"
            >Requested teachers are showing bellow , You can approve as a teacher or cancel his/her request</p>
        </div>
        <el-row
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
                <el-button-group>
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
            <h2>Add another admin</h2>
            <p
                class="howToAdd"
            >The requested admin are listed bellow add as a new admin or cancel his/her request</p>
        </div>
        <el-row class="AdminDetailRow" v-for="admin in loadApprovalsAdmin" :key="admin.adminid">
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
                <el-button-group>
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
    return {};
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userIsAdmin() {
      let user = this.$store.getters.userId;
      let Alladmin = this.$store.getters.getAdmins;

      return Alladmin.indexOf(user) > -1;
    },
    loadApprovalstec() {
      return this.$store.getters.loadApprovalstec;
    },
    loadApprovalsAdmin() {
      return this.$store.getters.loadApprovalsAdmin;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined && !userIsAdmin) {
        this.$router.push("/");
      }
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
    ApproveAdmin(id) {
      let admins = this.$store.getters.getDataOnapproveWithKey;
      admins.find(data => {
        for (let k in data) {
          if (data.adminid === id) {
            console.log(k);
          }
        }
      });
    },
    CancelAdmin(id) {
      console.log(id);
    },
    Approve(id) {
      console.log(id);
    },
    Cancel(id) {
      console.log(id);
    },
    // AddAdmin() {
    //   this.$store.dispatch("makeAnAdmin", this.adminId);
    //   this.adminId = "";
    // },

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
  margin-bottom: 53px;
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
  -webkit-box-shadow: 2px 2px 2px;
  box-shadow: 4px 7px 8px #484040;
  margin-bottom: 23px;
}
</style>
