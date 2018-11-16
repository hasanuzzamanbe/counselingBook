import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    user: null,
    teachers: [
      {
        teachersid: "121",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Johurul Haque",
        subject: "English",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "122",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Md. batin sheikh",
        subject: "Physics",
        time: "10 am to 3 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "123",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Dr. Azgor ali",
        subject: "Economics",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "124",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Shoriful Islam",
        subject: "statistic",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "125",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Johurul Haque",
        subject: "English",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "126",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Md. batin sheikh",
        subject: "Physics",
        time: "10 am to 3 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "127",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Dr. Azgor ali",
        subject: "Economics",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      },
      {
        teachersid: "128",
        imageUrl:
          "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
        name: "Shoriful Islam",
        subject: "statistic",
        time: "10 am to 5 pm",
        message: "You can send me text also to know more about counseling hour"
      }
    ],
    goToTeacher: {},
    schedules: [
      {
        NameOfT: "Abdul Motin",
        subject: "English",
        time: "23 aug 2018 12.45",
        status: "Accepted"
      }
    ],
    requestFromSt: [
      {
        name: "Rakibul hasan",
        studentId: "23456",
        date1: "2018-11-16 at 16:07:08",
        course: "math 321",
        toTeacher: "123",
        status: "Accepted"
      }
    ]
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    sendCounselRequest({ state }, payload) {
      state.requestFromSt.push(payload);

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
      state.schedules.push(MyRequestSchedules);
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
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    userProfileData({ state }, Username) {
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: Username
        })
        .then(() => {
          state.user.displayName = Username;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {});
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
      return state.schedules;
    },
    requestFromStudent(state) {
      return state.requestFromSt;
    }
  }
});
