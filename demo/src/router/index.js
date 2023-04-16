import Vue from "vue";
import Router from "vue-router";
import Calculate from "@/components/Calculate";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Calculate",
      component: Calculate
    }
  ]
});
