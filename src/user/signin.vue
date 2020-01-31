<template>
    <div class="mainDivTemplate">
        <el-row class="loadImgHome" v-if="isLoading">
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <img src="@/assets/loader.gif" alt="">
                </div>
            </el-col>
        </el-row>
        <h3 class="headSignup" v-if="!isLoading">Sign-in</h3>
        <el-row class="firststRow" v-if="!isLoading">
            <p>
                Here the sign in for both students and teachers.
                If anyone want to register for counseling
                hour he/she must have to sign in.
                <br>N.B: If you are new please
                <el-button type="text" @click="redirectSignup">sign up</el-button>first.
                <br>Please provide your mail and password bellow to login.
            </p>
        </el-row>
        <el-row v-if="!isLoading">
            <el-col :span="16">
                <el-form
                    @submit.native.prevent
                    :model="signInFormData"
                    status-icon
                    ref="signUpFormData"
                    label-width="120px"
                    style="margin-bottom: 100px;
                    margin-left: -121px;
                    max-width: 444px;"
                >
                    <el-form-item prop="email">
                        <el-input
                            v-model.number="signInFormData.mail"
                            placeholder="Enter your email address"
                            type="email"
                            style="margin-bottom: 22px"
                        ></el-input>
                        <span
                            v-if="!mailvalidated "
                            style="
                                  font-size: 12px;
                                  color: rgba(44, 62, 80, 0.58);
                                  margin-left: 1px;
                                  margin-top: -32px;
                             "
                        >*please input a valid email address (required)</span>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input
                            type="password"
                            v-model="signInFormData.pass"
                            autocomplete="off"
                            placeholder="Enter Your password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="success"
                            @click="onSignIn()"
                            size="small"
                            :disabled="!mailvalidated || !passValidate"
                        >Log in</el-button>
                        <p>Didn't registered yet?
                            <el-button type="text" @click="redirectSignup">sign Up</el-button>.
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
    return {
      signInFormData: {
        pass: "",
        mail: ""
      }
    };
  },
  computed: {
    mailvalidated() {
      return this.validateEmail(this.signInFormData.mail);
    },
    passValidate() {
      return this.signInFormData.pass !== "";
    },
    isLoading() {
      return this.$store.getters.getloadingState;
    },
    user() {
      return this.$store.getters.user;
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
    onSignIn() {
      this.$store.dispatch("signUserIn", {
        email: this.signInFormData.mail,
        password: this.signInFormData.pass
      });
      this.signInFormData.pass = "";
      this.signInFormData.mail = "";
    },
    redirectSignup() {
      this.$router.push("/signup");
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
