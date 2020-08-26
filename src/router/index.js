import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入布局组件
const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页",
    },
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
  },
  {
    path: "/console",
    name: "Console",
    meta: {
      name: "控制台",
      icon: "el-icon-watermelon",
    },
    redirect: "index",
    component: () =>
      import(/* webpackChunkName: "console" */ "../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页",
        },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Console/index.vue"),
      },
    ],
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "el-icon-milk-tea",
    },
    component: () =>
      import(/* webpackChunkName: "console" */ "../views/Layout/index.vue"),
    children: [
      {
        path: "/infoList",
        name: "InfoList",
        meta: {
          name: "信息列表",
        },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Info/list.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类",
        },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Info/category.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "el-icon-ice-cream-round",
    },
    component: () =>
      import(/* webpackChunkName: "console" */ "../views/Layout/index.vue"),
    children: [
      {
        path: "/userList",
        name: "UserList",
        meta: {
          name: "用户列表",
        },
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/User/list.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
