<template>
    <div class="footerBottom">
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <ul>
                        <li @click="homepage" style="cursor: pointer;">Home</li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light rightFot">
                    @copyright
                    <a
                        href="https://www.hasanuzzaman.com"
                        style="    color: indianred;"
                    >Hasanuzzaman</a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  methods: {
    homepage() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
div li {
  list-style: none;
  display: inline;
}
.footerBottom {
  background: #403939;
  color: white;
  height: 51px;
  line-height: 28px;
}
.rightFot {
  text-align: right;
  line-height: 56px;
  font-family: cursive;
  padding-right: 17px;
}
</style>
