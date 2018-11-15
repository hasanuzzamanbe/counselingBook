<template>
    <div class="teacherPage">
        <h3 class="teacherDetails">Teacher Details:</h3>
        <el-row class="teacherDetailRow" v-for="teacher in getTeachers" :key="teacher.teachersid">
            <el-col :span="18">
                <div class="grid-content bg-purple">
                    <h3>{{teacher.name}}</h3>
                    <p>Subject: {{teacher.subject}}</p>
                    <p>Available time:{{teacher.time}}</p>
                    <p>Message from teacher: {{teacher.message}}</p>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <img :src="teacher.imageUrl" alt="">
                </div>
            </el-col>
        </el-row>
        <el-row>
            <h3>Request teacher for counseling:</h3>
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
                    <el-col :span="12">
                        <el-form-item label="Counseling time" required>
                            <el-date-picker
                                v-model="counselingDetails.date1"
                                type="datetime"
                                placeholder="Select date and time"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="sendRequest">Request</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
import * as firebase from "firebase";
export default {
  props: ["teachersid", "ID"],
  data() {
    return {
      counselingDetails: {
        name: "",
        studentId: "",
        date1: "",
        course: ""
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
            message: "Length should be 3 to 5",
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
    getTeachers() {
      return this.$store.getters.getTeacher;
    }
  },
  methods: {
    sendRequest() {
      console.log(this.counselingDetails);
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
  }
  .el-form-item__error {
    margin-top: -35px;
  }
}
.teacherDetails {
  text-decoration: underline;
}
.teacherDetailRow.el-row {
  border: 1px solid #30313314;
  padding: 24px;
}
</style>
