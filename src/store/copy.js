import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";
import { resolve, reject } from "core-js";
import { Login } from "@/api/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
    count: 1,
  },
  getters: {
    count: (state) => state.count + 100,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
      // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    },
  },
  actions: {
    login(content, data) {
      return new Promise((resolve, reject) => {
        Login(data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
