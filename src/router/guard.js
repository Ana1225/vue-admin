import router from "./index";
import store from "../store/index";
import { getToken, removeToken, removeUsername } from "@/utils/app";
const whiteRouter = ["/login"]; //indexOf 判断数组中是否存在指定的值 不存在返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == "/login") {
      removeToken();
      removeUsername();
      store.commit("app/SET_TOKEN", "");
      store.commit("app/SET_USERNAME", "");
      next();
    } else {
      // 获取用户角色，分配权限
      next();
    }

    console.log("存在");
    //   路由动态添加，每个角色分配不同菜单
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
