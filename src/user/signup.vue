<template>
    <div class="mainDivTemplate">
        <h3 class="headSignup">SignUp</h3>
        <el-row class="firststRow">
            <p>
                Here the sign up methode for the student only.
                If anyone want to register for counseling
                hour he/she must have to sign in.
                <br>N.B: If you have an existing
                account please sign In.
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
                        ></el-input>
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
                        <el-button type="primary" @click="submitForm()">Sign Up</el-button>
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
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.signUpFormData.checkPass !== "") {
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
  methods: {
    submitForm() {
      let signUpData = {
        mail: this.signUpFormData.mail,
        pass: this.signUpFormData.pass
      };
      console.log(signUpData);
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
