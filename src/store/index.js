import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    user: null,
    error: null,
    teachers: [
      {
        teachersid: "9p8N1xNwTPXFsSoTl82RB0cIW3D3",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Johurul Haque",
        subject: "English",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "vxeFPyNrQtPfgJRdJibsD3HZbvH2",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Md. batin sheikh",
        subject: "Physics",
        time: "10 am to 3 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "YOIY5EWq5oe3heMfv1JEHfXMRlt1",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Dr. Azgor ali",
        subject: "Economics",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "ZHfC77tFPfRjC4qSpasXiRwbOSJ3",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Shoriful Islam",
        subject: "statistic",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      }
    ],
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
    }
  },
  actions: {
    loadData({ state }) {
      firebase
        .database()
        .ref("requestToTeacher")
        .once("value")
        .then(data => {
          let requestData = data.val();
          for (let i in requestData) {
            state.requestFromSt.push(requestData[i]);
          }
        });
      firebase
        .database()
        .ref("myschedules")
        .once("value")
        .then(data => {
          let getschedules = data.val();
          for (let i in getschedules) {
            state.schedules.push(getschedules[i]);
          }
        });
    },
    sendCounselRequest({ state }, payload) {
      state.requestFromSt.push(payload);
      firebase
        .database()
        .ref("requestToTeacher")
        .push(payload);

      let MyRequestSchedules = {};
      let teacherName = state.teachers.find(data => {
        if (data.teachersid === payload.toTeacher) {
          return data.name;
        }
      });

      MyRequestSchedules.NameOfT = teacherName.name;
      MyRequestSchedules.subject = payload.course;
      MyRequestSchedules.time = payload.date1;
      MyRequestSchedules.status = payload.status;
      MyRequestSchedules.studentUidF = payload.studentUidF;
      state.schedules.push(MyRequestSchedules);

      firebase
        .database()
        .ref("myschedules")
        .push(MyRequestSchedules);
    },

    uploadFirebase(state, payload) {
      firebase
        .database()
        .ref("students")
        .push(payload)
        .then(data => {
          console.log(data.key);
        });
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setError", error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
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
    }
  },
  getters: {
    allTeachers(state) {
      return state.teachers;
    },
    getTeacher(state) {
      return state.goToTeacher;
    },
    user(state) {
      return state.user;
    },
    mySchedules(state) {
      let mySchedules = [];
      state.schedules.find(data => {
        if (data.studentUidF === state.user.id) {
          mySchedules.push(data);
        }
      });
      return mySchedules;
    },
    requestFromStudent(state) {
      return state.requestFromSt;
    }
  }
});
