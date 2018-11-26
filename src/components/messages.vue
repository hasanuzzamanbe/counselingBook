<template>
    <div class="mainDivTemplate" v-if="userIsAdmin">
        <h2 class="headSignup" style="text-decoration:underline">Message to Admin</h2>
        <div v-for="(m,i) in msg" :key="i">
            <p>From:</p>
            <a :href="'mailto:' + m.mail">{{m.name}}</a>
            <p>Message: {{m.msg}}</p>
            <hr>
        </div>
    </div>
</template>
<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      userIsAdmin: false
    };
  },
  computed: {
    msg() {
      return this.$store.getters.messageToAdmin;
    }
  },
  methods: {},
  mounted: function(value) {
    let user = this.$store.getters.user;
    let Alladmin = this.$store.getters.getAdmins;
    if (user) {
      if (Alladmin.indexOf(user.id) > -1) {
        return (this.userIsAdmin = true);
      }
    }
  },
  beforeUpdate: function(value) {
    let user = this.$store.getters.user;
    let Alladmin = this.$store.getters.getAdmins;
    if (user) {
      if (Alladmin.indexOf(user.id) > -1) {
        return (this.userIsAdmin = true);
      }
    }
  }
};
</script>

