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
        <el-row>
            <el-col :span="16">
                <el-form
                    style="margin-bottom: 100px;"
                    :model="signUpFormData"
                    status-icon
                    :rules="rules2"
                    ref="signUpFormData"
                    label-width="120px"
                >
                    <el-form-item label="Email" prop="email">
                        <el-input
                            v-model.number="signUpFormData.mail"
                            placeholder="Enter your email address"
                            type="email"
                        ></el-input>
                        <span
                            v-if="!mailvalidated"
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
                            v-model="signUpFormData.pass"
                            autocomplete="off"
                            placeholder="Enter a password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm" prop="checkPass">
                        <el-input
                            type="password"
                            v-model="signUpFormData.checkPass"
                            autocomplete="off"
                            placeholder="reenter your password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm()"
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
          this.signUpFormData.checkPass !== "" &&
          this.signUpFormData.checkPass.length >= 6
        ) {
          this.$refs.signUpFormData.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.signUpFormData.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      signUpFormData: {
        pass: "",
        checkPass: "",
        mail: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  computed: {
    mailvalidated() {
      return this.validateEmail(this.signUpFormData.mail);
    },
    passValidate() {
      return (
        this.signUpFormData.pass !== "" &&
        this.signUpFormData.pass.length >= 6 &&
        this.signUpFormData.pass === this.signUpFormData.checkPass
      );
    }
  },
  methods: {
    submitForm() {
      let signUpData = {
        mail: this.signUpFormData.mail,
        pass: this.signUpFormData.pass
      };
      console.log(signUpData);
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
