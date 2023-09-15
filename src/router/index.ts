import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Transport from "@/layouts/Transport.vue";
import Routes from "@/layouts/Routes.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/transport",
    name: "transport",
    component: Transport,
  },
  {
    path: "/routes",
    name: "routes",
    component: Routes,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
