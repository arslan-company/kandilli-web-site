import Vue from "vue";
import Router from "vue-router";
import ApiService from "./core/services/api.service";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/CreateReservation",
          name: "CreateReservation",
          component: () => import("@/view/pages/CreateReservation.vue")
        },
        {
          path: "/CustomerList",
          name: "CustomerList",
          component: () => import("@/view/pages/CustomerList.vue")
        },
        {
          path: "/ReservationList",
          name: "ReservationList",
          component: () => import("@/view/pages/ReservationList.vue")
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/login_pages/Login-1"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/login_pages/Login-1"),
          meta: {
            allowAnonymous: true
          }
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/login_pages/Login-1")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.allowAnonymous && !ApiService.isLoggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
});

export default router;
