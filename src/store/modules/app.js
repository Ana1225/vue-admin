import { Login } from "@/api/login";
import {
  setToken,
  removeToken,
  removeUsername,
  setUsername,
  getUsername,
} from "@/utils/app";
import { resolve, reject } from "core-js";

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
  count: 1,
  to_ken: "",
  username: getUsername() || "",
};
const getters = {
  count: (state) => state.count + 100,
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
};
const actions = {
  login(content, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then((res) => {
          let data = res.data.data;
          // 存 token  , username
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeUsername();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
