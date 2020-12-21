import Vue from "vue";
import Router from "vue-router";
import ApiService from "./core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import decode from "jwt-decode";

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
          component: () => import("@/view/pages/Dashboard.vue"),
          beforeEnter: (to, from, next) => {
            var temp = false;
            let authToken = decode(JwtService.getToken());
            authToken.AuthorityList.forEach(el => {
              if (el === "get_rapor") {
                temp = true;
              }
            });
            if (temp) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/CreateReservation",
          name: "CreateReservation",
          component: () => import("@/view/pages/CreateReservation.vue"),
          beforeEnter: (to, from, next) => {
            var temp = false;
            let authToken = decode(JwtService.getToken());
            authToken.AuthorityList.forEach(el => {
              if (el === "add_randevu") {
                temp = true;
              }
            });
            if (temp) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/CustomerList",
          name: "CustomerList",
          component: () => import("@/view/pages/CustomerList.vue"),
          beforeEnter: (to, from, next) => {
            var temp = false;
            let authToken = decode(JwtService.getToken());
            authToken.AuthorityList.forEach(el => {
              if (el === "view_musteri_listesi") {
                temp = true;
              }
            });
            if (temp) {
              next();
            } else {
              next(false);
            }
          }
        },
        {
          path: "/ReservationList",
          name: "ReservationList",
          component: () => import("@/view/pages/ReservationList.vue"),
          beforeEnter: (to, from, next) => {
            var temp = false;
            let authToken = decode(JwtService.getToken());
            authToken.AuthorityList.forEach(el => {
              if (el === "view_randevu_liste") {
                temp = true;
              }
            });
            if (temp) {
              next();
            } else {
              next(false);
            }
          }
        }
      ]
    },
    {
      path: "/",
      component: () => import("@/view/pages/auth/Login"),
      children: [
        {
          name: "login",
          path: "/login",
          component: () => import("@/view/pages/auth/Login")
        },
        {
          name: "register",
          path: "/register",
          component: () => import("@/view/pages/auth/Login")
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
  if (to.name !== "login" && !ApiService.isLoggedIn()) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
