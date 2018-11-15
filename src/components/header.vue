<template>
    <div>
        <el-row>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-tabs :tab-position="tabPosition" style="height: 200px;">
                        <el-tab-pane label="Profile">Profile</el-tab-pane>
                        <el-tab-pane label="Log out">Log out</el-tab-pane>
                        <el-tab-pane label="Teachers">Teachers</el-tab-pane>
                        <el-tab-pane label="Schedules">Schedules</el-tab-pane>
                        <el-tab-pane label="My schedules">My schedules</el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
            <el-col :span="18">
                <img src="@/assets/caroseul1c.jpg" alt="">
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  methods: {}
};
</script>
<style scoped>
.el-tabs__nav.is-left div:hover {
  transition-duration: 1s;
  font-weight: bold;
  color: #e6a23c;
}
.el-tabs__content {
  color: darkred;
  font-family: cursive;
}
</style>
