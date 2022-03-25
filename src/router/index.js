import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "@/supabase";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewWorkout from "../views/ViewWorkout.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      auth: true,
    },
  },

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      auth: false,
    },
  },

  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
    },
  },

  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      auth: true,
    },
  },

  {
    path: "/view-workout/:workoutId",
    name: "View-Workout",
    component: ViewWorkout,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});
export default router;
