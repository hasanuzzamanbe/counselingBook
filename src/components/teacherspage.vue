<template>
    <div class="teacherPage">
        <h3 class="teacherDetails">Teacher Details:</h3>
        <el-row class="loadImgHome" v-if="isLoading">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/loader.gif" alt="">
                </div>
            </el-col>
        </el-row>
        <el-row class="teacherDetailRow" v-for="teacher in getTeachers" :key="teacher.teachersid">
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <h3>{{teacher.name}}</h3>
                    <p>Subject: {{teacher.subject}}</p>
                    <p>Available time:{{teacher.time}}</p>
                    <p>Message from teacher: {{teacher.message}}</p>
                </div>
                <el-button v-if="isThisTeacher" @click="editDetailsModal=true">Edit details</el-button>
            </el-col>
            <el-dialog :visible.sync="editDetailsModal" v-if="editDetailsModal">
                <div v-for="(teacher) in getTeachers" :key="teacher.teachersid">
                    <h2>Edit user details from here</h2>
                    <el-input type="text" v-model="teacher.name"></el-input>
                    <el-input type="text" v-model="teacher.subject"></el-input>
                    <el-input type="text" v-model="teacher.time"></el-input>
                    <el-input type="text" v-model="teacher.message"></el-input>
                </div>
                <el-button type="success" @click="submiteditDetails(teacher.teachersid)">Save</el-button>
            </el-dialog>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <img :src="teacher.imageUrl" alt="">
                </div>
            </el-col>
        </el-row>
        <el-row class="requestFormRow">
            <h3 style="text-decoration:underline;">Request teacher for counseling:</h3>
            <el-form
                :model="counselingDetails"
                :rules="rules"
                ref="counselingDetails"
                label-width="120px"
            >
                <el-row>
                    <el-form-item prop="name" label="Name">
                        <el-input v-model="counselingDetails.name" placeholder="Enter your name"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item prop="studentId" label="ID">
                        <el-input
                            v-model="counselingDetails.studentId"
                            placeholder="Enter your student id"
                        ></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="course" label="course">
                            <el-input
                                v-model="counselingDetails.course"
                                placeholder="Enter your course name/code"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="margin-left: -63px;">
                        <el-form-item label="Time" required>
                            <el-date-picker
                                v-model="counselingDetails.date1"
                                type="datetime"
                                placeholder="Select date and time"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button
                        type="success"
                        size="small"
                        style="width: 300px;
                        font-size: 18px;
                        font-family: monospace;"
                        @click="sendRequest"
                        :disabled="!requestFormValid"
                    >Request</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="teacherRequestedRow">
            <h3 style="text-decoration:underline;margin-top: 47px;">Teacher Requested by:</h3>
            <el-row>
                <p>students are showing bellow who are requested to this teacher</p>
            </el-row>
        </el-row>
        <el-row class="loadImgHome" v-if="isLoading">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/loader.gif" alt="">
                </div>
            </el-col>
        </el-row>
        <el-row v-for="(request,i) in requestFromSt" :key="i" class="byStudentRow">
            <el-card class="cardBody" :body-style="{ padding: '0px' }">
                <el-col :span="12">
                    <div style="padding-left: 54px;">
                        <h4
                            style="font-size: 19px;
                        margin-bottom: -4px;"
                        >Name:{{request.name}}</h4>
                        <p>Student Id:{{request.studentId}}</p>
                        <time class="time">Time: {{request.date1}}</time>
                        <p>Course: {{request.course}}</p>
                    </div>
                </el-col>
                <el-col :span="8" style="margin-top: 27px;float:right">
                    <span class="statusSpan">Status: {{request.status}}</span>
                    <el-button-group style="margin-top: 80px;">
                        <el-button
                            v-if="isThisTeacher"
                            size="mini"
                            type="primary"
                            style="
                            background-color: #3b7794;"
                            @click="setStatus(request.requestId)"
                        >Open</el-button>
                        <el-button
                            v-if="isThisTeacher"
                            label="Accept"
                            @click="acceptedByT(request.requestId)"
                            size="mini"
                            type="primary"
                        >Accept</el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            @click="submitDelete(request.requestId) "
                            v-if="IsValidUserStudent ===request.studentUidF"
                        >Delete</el-button>
                    </el-button-group>
                    <el-dialog
                        title="Tell something else"
                        :visible.sync="dialogVisible"
                        width="30%"
                    >
                        <el-input type="text" v-model="requedtEdit.status"></el-input>
                        <el-button @click="dialogVisible = false">Cancel</el-button>
                        <el-button type="primary" @click="submitEdit ">Confirm</el-button>
                    </el-dialog>
                </el-col>
            </el-card>
        </el-row>
        <el-row>
            <el-button @click="backtoHome" class="bootomButtonHome">back to home</el-button>
        </el-row>
    </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  props: ["teachersid", "ID"],
  data() {
    return {
      teacherData: [],
      TeacherDataKey: [],
      editDetailsModal: false,
      dialogVisible: false,
      requestfrom: [],
      requedtEdit: {},
      counselingDetails: {
        name: "",
        studentId: "",
        studentUidF: "",
        date1: "",
        course: "",
        status: "on request.."
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Your name",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Length should be min 3",
            trigger: "blur"
          }
        ],

        studentId: [
          {
            required: true,
            message: "Please input Your Student Id",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    isThisTeacher() {
      if (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      ) {
        let user = this.$store.getters.user.id;
        return this.ID === user;
      }
    },
    IsValidUserStudent() {
      return this.$store.getters.userId;
    },
    requestFormValid() {
      return (
        this.counselingDetails.name !== "" &&
        this.counselingDetails.studentId !== "" &&
        this.counselingDetails.date1 !== "" &&
        this.counselingDetails.course !== ""
      );
    },
    getTeachers() {
      this.teacherData = [];
      this.$store.getters.allTeachers.find(data => {
        if (data.teachersid === this.ID) {
          this.teacherData.push(data);
        }
      });
      return this.teacherData;
    },
    requestFromSt() {
      this.requestfrom = [];
      this.$store.getters.requestFromStudent.find(data => {
        if (data.toTeacher === this.ID) {
          this.requestfrom.push(data);
        }
      });
      return this.requestfrom;
    },
    isLoading() {
      return this.$store.getters.getloadingState;
    }
  },
  methods: {
    backtoHome() {
      this.$router.push("/");
    },
    submiteditDetails(idOfTec) {
      let allTeacherWithKey = this.$store.getters.keyWithTeacherAll;
      for (let obj in allTeacherWithKey) {
        for (let ob in allTeacherWithKey[obj]) {
          if (allTeacherWithKey[obj][ob] === idOfTec) {
            this.TeacherDataKey = obj;
          }
        }
      }
      let path = "teachers" + "/" + this.TeacherDataKey;
      firebase
        .database()
        .ref(path)
        .set(this.getTeachers[0]);
      this.editDetailsModal = false;
    },
    acceptedByT(reqStdId) {
      this.$store.getters.requestFromStudent.filter(data => {
        if (data.requestId === reqStdId) {
          return (this.requedtEdit = data);
        }
      });
      this.requedtEdit.status = "Accepted";
      let pathofPost = this.requedtEdit.requestId;
      let path = "requestToTeacher" + "/" + pathofPost;

      firebase
        .database()
        .ref(path)
        .set(this.requedtEdit);
    },
    setStatus(reqStdId) {
      this.dialogVisible = true;
      this.$store.getters.requestFromStudent.filter(data => {
        if (data.requestId === reqStdId) {
          return (this.requedtEdit = data);
        }
      });
    },
    submitEdit() {
      let pathofPost = this.requedtEdit.requestId;
      let path = "requestToTeacher" + "/" + pathofPost;
      firebase
        .database()
        .ref(path)
        .set(this.requedtEdit);
      this.dialogVisible = false;
    },
    submitDelete(reqStdId) {
      this.$store.getters.requestFromStudent.filter(data => {
        if (data.requestId === reqStdId) {
          return (this.requedtEdit = data);
        }
      });
      let pathofPost = this.requedtEdit.requestId;

      let path = "requestToTeacher" + "/" + reqStdId;
      let firebaseRef = firebase.database().ref(path);
      firebaseRef.remove().then(() => {});

      this.$store.dispatch("removeRequestlocal", pathofPost);
    },

    alertOfSenrRequest() {
      this.$notify({
        title: "Success",
        message: "Your request is submitted to teacher",
        type: "success"
      });
    },
    sendRequest() {
      let x = this.counselingDetails.date1;
      let date = JSON.stringify(x).substring(1, 11);
      let time = JSON.stringify(x).substring(12, 20);
      let arr = time.split();
      let arr1 = Number(arr[0].substring(0, 2));
      let arr2 = arr1 + 6;
      let arr3 = arr[0].substring(3, arr[0].length);
      let arr4 = arr2 + ":" + arr3;
      let newDate = date + " " + "at" + " " + arr4;
      this.counselingDetails.toTeacher = this.ID;
      this.counselingDetails.date1 = newDate;
      this.counselingDetails.studentUidF = this.$store.getters.user.id;
      this.$store.dispatch("sendCounselRequest", this.counselingDetails);
      this.alertOfSenrRequest();
      this.counselingDetails = {};
      this.counselingDetails.status = "on request..";
    }
  },

  mounted: function() {
    this.$store.dispatch("teachersPage", this.ID);
  }
};
</script>
<style scoped>
@media only screen and (min-width: 600px) {
  .teacherPage {
    padding: 106px;
    font-family: monospace;
  }

  .el-form-item__error {
    margin-top: -35px;
  }
}
.teacherDetails {
  text-decoration: underline;
}
.teacherDetailRow.el-row {
  border: 1px solid #e7dddd;
  padding: 24px;
  background: #78e0c447;
}
p {
  font-size: 16px;
}
h3 {
  font-size: 20px;
}
.el-card.cardBody.is-always-shadow {
  background: #3b7794;
  color: white;
}
.teacherRequestedRow {
  margin-top: 35px;
  border-top: 1px solid #cebaba73;
  border-left: 1px solid #cebaba73;
  border-right: 1px solid #cebaba73;
  padding: 12px;
}
.byStudentRow {
  border-bottom: 1px solid #cebaba73;
  border-left: 1px solid #cebaba73;
  border-right: 1px solid #cebaba73;
  padding: 12px;
}
.requestFormRow {
  /* background-image: url(/static/img/formback.7e7de8c.jpg);
  background-size: contain; */
  color: rgb(20, 20, 20);
  margin-top: 20px;
  border: 1px solid #cebaba73;
  padding: 12px;
  margin-top: 47px;
}
.el-button--success {
  color: #fff;
  background-color: #3b7794;
  border-color: #3b7794;
}
.el-form-item__label {
  font-size: 17px;
  color: #ffffff !important;
}
.statusSpan {
  border: 1px solid rgb(208, 163, 163);
  padding: 3px;
  border-radius: 6px;
  color: yellowgreen;
  position: absolute;
  background: #0f443fed;
  font-size: 15px;
  min-height: 22px;
  max-height: 54px;
  max-width: 301px;
  overflow: hidden;
}
input.el-input__inner {
  margin-bottom: 8px;
}
.bootomButtonHome {
  float: right;
  margin-top: 101px;
  margin-bottom: -69px;
}
</style>
