import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    onApproveAdminWithkey: [],
    onApproveTecWithkey: [],
    approvalAdmin: [],
    approvalTech: [],
    alltecherWithKey: "",
    admins: [],
    loading: false,
    user: null,
    error: null,
    teachers: [],
    goToTeacher: {},
    schedules: [],
    requestFromSt: []
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    isloading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    loadData({ state }) {
      state.loading = true;
      firebase
        .database()
        .ref("requestToTeacher")
        .once("value")
        .then(data => {
          let requestData = data.val();
          for (let i in requestData) {
            state.requestFromSt.push(requestData[i]);
          }
          state.loading = false;
        });
    },
    loadDataOfTeacher({ state }) {
      state.loading = true;
      firebase
        .database()
        .ref("teachers")
        .once("value")
        .then(data => {
          state.alltecherWithKey = data.val();
          let requestData = data.val();
          for (let i in requestData) {
            state.teachers.push(requestData[i]);
          }
          state.loading = false;
        });
    },
    loadApprovalsAdmin({ state }) {
      firebase
        .database()
        .ref("approvalAdmin")
        .once("value")
        .then(data => {
          let requestData = data.val();
          state.onApproveAdminWithkey.push(requestData);
          for (let i in requestData) {
            state.approvalAdmin.push(requestData[i]);
          }
          state.loading = false;
        });
    },
    loadApprovalsTeacher({ state }) {
      firebase
        .database()
        .ref("approval")
        .once("value")
        .then(data => {
          let requestData = data.val();
          state.onApproveTecWithkey.push(data.val());

          for (let i in requestData) {
            state.approvalTech.push(requestData[i]);
          }
          state.loading = false;
        });
      console.log(state.onApproveTecWithkey);
    },
    sendCounselRequest({ state }, payload) {
      state.loading = true;
      let teacherName = state.teachers.find(data => {
        if (data.teachersid === payload.toTeacher) {
          return data.name;
        }
      });

      payload.Teacher = teacherName.name;

      firebase
        .database()
        .ref("requestToTeacher")
        .push(payload)
        .then(data => {
          payload.requestId = data.key;
          let newPath = "requestToTeacher" + "/" + data.key;
          firebase
            .database()
            .ref(newPath)
            .set(payload)
            .then(data => {
              state.loading = false;
            });
        });

      state.requestFromSt.push(payload);
    },
    addTeacher({ state }, payload) {
      firebase
        .database()
        .ref("teachers")
        .push(payload)
        .then(data => {});
      state.teachers.push(payload);
    },
    makeAnAdmin({ state }, payload) {
      firebase
        .database()
        .ref("admins")
        .push(payload)
        .then(data => {
          alert("Admin Added Success");
        });
    },
    loadDataOfAdmin({ state }) {
      firebase
        .database()
        .ref("admins")
        .once("value")
        .then(data => {
          let allAdmins = data.val();

          for (let admin in allAdmins) {
            state.admins.push(allAdmins[admin]);
          }
        });
    },

    uploadFirebase(state, payload) {
      firebase
        .database()
        .ref("students")
        .push(payload)
        .then(data => {});
    },
    teachersPage({ state }, payload) {
      state.teachers.find(data => {
        if (data.teachersid === payload) {
          state.goToTeacher = [data];
        }
      });
    },
    signUserUp({ commit }, payload) {
      commit("clearError");
      commit("isloading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.mail, payload.pass)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
          payload.teachersid = newUser.id;
          delete payload.pass;
          delete payload.checkPass;
          firebase
            .database()
            .ref("approval")
            .push(payload);
          commit("isloading", false);
        })
        .catch(error => {
          commit("setError", error);
          alert(error);
        });
    },
    signUserUpadmin({ commit }, payload) {
      commit("isloading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.mail, payload.pass)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
          payload.adminid = newUser.id;
          delete payload.pass;

          firebase
            .database()
            .ref("approvalAdmin")
            .push(payload);
          commit("isloading", false);
        })
        .catch(error => {
          commit("setError", error);
          alert(error);
        });
    },
    signUserUpStudent({ commit }, payload) {
      commit("isloading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.mail, payload.pass)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);

          commit("isloading", false);
        })
        .catch(error => {
          commit("setError", error);
          alert(error);
        });
    },

    signUserIn({ commit }, payload) {
      commit("isloading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
          commit("isloading", false);
        })
        .catch(error => {
          commit("setError", error.code);
          if (error.code) {
            alert(error.code);
          }
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    removeRequestlocal({ state }, payload) {
      let indexRem = state.requestFromSt.find(data => {
        if (data.requestId === payload) {
          return data;
        }
      });
      let indexRemDel = state.requestFromSt.indexOf(indexRem);
      state.requestFromSt.splice(indexRemDel, 1);
    }
  },
  getters: {
    keyWithTeacherAll(state) {
      return state.alltecherWithKey;
    },
    getloadingState(state) {
      return state.loading;
    },
    allTeachers(state) {
      return state.teachers;
    },
    getTeacher(state) {
      return state.goToTeacher;
    },
    user(state) {
      return state.user;
    },
    userId(state) {
      return state.user.id;
    },
    mySchedules(state) {
      let mySchedules = [];
      state.requestFromSt.find(data => {
        if (data.studentUidF === state.user.id) {
          mySchedules.push(data);
        }
      });
      return mySchedules;
    },
    requestFromStudent(state) {
      return state.requestFromSt;
    },
    getAdmins(state) {
      return state.admins;
    },
    loadApprovalsAdmin(state) {
      return state.approvalAdmin;
    },
    loadApprovalstec(state) {
      return state.approvalTech;
    },
    getDataOnapproveWithKey(state) {
      return state.onApproveAdminWithkey;
    },
    getDataOnapproveWithKeyTec(state) {
      return state.onApproveTecWithkey;
    }
  }
});
