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
    goToTeacher: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
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
    }
  }
});
