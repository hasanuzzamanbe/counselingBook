<template>
    <div class="mainDivTemplate">
        <h3 class="headSignup">Sign-Up</h3>
        <el-row class="firststRow">
            <p>
                Here the sign up for the new students only.
                If anyone want to register for counseling
                hour he/she must have to sign in.
                <br>N.B: If you have an existing
                account please
                <el-button type="text" @click="redirectSignin">sign In</el-button>.
                <br>New user can create account from bellow.
            </p>
        </el-row>
        <el-row class="loadImgHome" v-if="isLoading">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <img src="@/assets/loader.gif" alt="">
                </div>
            </el-col>
        </el-row>
        <el-tabs type="border-card" v-if="!isLoading">
            <el-tab-pane label="Sign Up as Student">
                <el-row>
                    <el-col :span="16">
                        <el-form
                            style="margin-bottom: 100px;"
                            :model="teacherData"
                            status-icon
                            :rules="rules2"
                            ref="teacherData"
                            label-width="120px"
                        >
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
                                    placeholder="reenter your password"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onSignUpStudent()"
                                    size="small"
                                    :disabled="!mailvalidated || !passValidate"
                                >Sign Up</el-button>
                                <p>Already have an account ?
                                    <el-button type="text" @click="redirectSignin">sign In</el-button>.
                                </p>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Sign Up as Teacher">
                <el-row>
                    <el-col :span="16">
                        <el-form
                            style="margin-bottom: 100px;"
                            :model="teacherData"
                            status-icon
                            :rules="rules2"
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
                            <el-form-item label="Subject">
                                <el-input
                                    v-model="teacherData.subject"
                                    placeholder="Enter your Subject"
                                    type="text"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="time">
                                <el-input
                                    v-model="teacherData.time"
                                    placeholder="(i.e. from 10am to 6pm)"
                                    type="text"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Email" prop="email">
                                <el-input
                                    v-model="teacherData.mail"
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
                                    placeholder="reenter your password"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onSignUp()"
                                    size="small"
                                    :disabled="!mailvalidated || !passValidate"
                                >Sign Up</el-button>
                                <p>Already have an account ?
                                    <el-button type="text" @click="redirectSignin">sign In</el-button>.
                                </p>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Sign Up as Admin">
                <el-row>
                    <el-col :span="16">
                        <el-form
                            style="margin-bottom: 100px;"
                            :model="teacherData"
                            status-icon
                            :rules="rules2"
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
                                    placeholder="reenter your password"
                                ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="onSignUpAdmin()"
                                    size="small"
                                    :disabled="!mailvalidated || !passValidate"
                                >Sign Up</el-button>
                                <p>Already have an account ?
                                    <el-button type="text" @click="redirectSignin">sign In</el-button>.
                                </p>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "" || value.length < 6) {
        callback(new Error("Please input the password (greater than 6 digit)"));
      } else {
        if (
          this.teacherData.checkPass !== "" &&
          this.teacherData.checkPass.length >= 6
        ) {
          this.$refs.teacherData.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.teacherData.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      teacherData: {},
      teacherData: {
        pass: "",
        checkPass: "",
        mail: "",
        name: "",
        subject: "",
        time: "",
        message: "",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png"
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.getloadingState;
    },
    mailvalidated() {
      return this.validateEmail(this.teacherData.mail);
    },
    mailBoxnotEmpty() {
      return this.teacherData.mail !== " ";
    },
    user() {
      return this.$store.getters.user;
    },
    passValidate() {
      return (
        this.teacherData.pass !== "" &&
        this.teacherData.pass.length >= 6 &&
        this.teacherData.pass === this.teacherData.checkPass
      );
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    signUpSuccessAlert() {
      this.$notify({
        title: "Success",
        message: "Your account created successfully",
        type: "success"
      });
    },
    onSignUp() {
      this.$store.dispatch("signUserUp", this.teacherData);
    },
    onSignUpAdmin() {
      this.$store.dispatch("signUserUpadmin", {
        name: this.teacherData.name,
        mail: this.teacherData.mail,
        pass: this.teacherData.pass
      });
    },
    onSignUpStudent() {
      this.$store.dispatch("signUserUpStudent", {
        mail: this.teacherData.mail,
        pass: this.teacherData.pass
      });
    },
    redirectSignin() {
      this.$router.push("/signin");
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>
<style scoped>
.headSignup {
  text-decoration: underline;
  font-family: monospace;
  font-size: 23px;
}
p {
  font-family: monospace;
  font-size: 16px;
}
.firststRow {
  margin-bottom: 32px;
}
</style>
