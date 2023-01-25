import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "memos",
    },
    {
      path: "/memos/new",
      name: "new",
      component: () => import("../views/FormView.vue"),
      props: true,
    },
    {
      path: "/memos/:memoId",
      name: "memo",
      component: () => import("../views/FormView.vue"),
      props: true,
    },
  ],
});

export default router;
