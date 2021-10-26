import Vue from "vue";
import VueRouter from "vue-router";
const routes = require("./routes");
import Store from "@/store";

function lazyload(path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${path}`);
}

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/default"),
      children: ((routes || {}).default || []).map(
        ({ componentFilePath, ...props }) => ({
          ...props,
          component: lazyload(componentFilePath),
        })
      ),
    },

    {
      name: "login",
      path: "/login",
      component: () => import("@/layouts/login-form"),
    },

    // {
    //   name: "noAccess",
    //   path: "/403",
    //   component: () => import("@/layouts/403"),
    // },

    {
      path: "*",
      redirect: "employee",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthorized = !!Store.state.auth.access;
  const requiresAuth = to.matched.some((x) => x.meta && x.meta.requiresAuth);

  if (requiresAuth && !isAuthorized) {
    next({
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    });
    return;
  } else if (isAuthorized) {
    if (to.name == "login") {
      next({
        name: "employee",
      });
      return;
    }

    if (to.name == "index" || to.path == "/") {
      next({
        name: "employee",
      });
      return;
    }
  }

  next();
});

export default router;
