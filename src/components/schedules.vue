<template>
    <div class="mainDivTemplate">
        <h3 class="headSignup">My Schedules</h3>
        <el-row style="margin-bottom:32px">
            <p>All of your requested teacher are shown here.
                <br>N.B: If your status is accepted then you can meet to your teacher at the requested time.
            </p>
        </el-row>
        <el-row style="margin-bottom:34px">
            <el-col :span="6" v-for="(reg, index) in schedules" :key="index">
                <el-card class="cardBody" :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;">
                        <span>{{reg.NameOfT}}</span>
                        <p>Subject:{{reg.subject}}</p>
                        <div class="bottom clearfix">
                            <time class="time">Time: {{ reg.time }}</time>
                            <p>
                                Status:
                                <span
                                    style="border: 1px solid #d0a3a3;
                                 padding: 3px;
                                 border-radius: 13px;
                                 color: yellowgreen;"
                                >{{reg.status}}</span>
                            </p>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    schedules() {
      return this.$store.getters.mySchedules;
    }
  }
};
</script>

<style>
.headSignup {
  text-decoration: underline;
  font-family: monospace;
  font-size: 23px;
}
p {
  font-family: monospace;
  font-size: 16px;
}
</style>
