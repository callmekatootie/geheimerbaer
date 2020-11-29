import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index
  },
  {
    path: "/encode-symmetric",
    name: "EncodeSymmetric",
    component: () =>
      import(
        /* webpackChunkName: "encode-symmetric" */ "../views/EncodeSymmetric.vue"
      )
  },
  {
    path: "/decode-symmetric",
    name: "DecodeSymmetric",
    component: () =>
      import(
        /* webpackChunkName: "decode-symmetric" */ "../views/DecodeSymmetric.vue"
      )
  },
  {
    path: "/generate-keypairs",
    name: "GenerateKeyPairs",
    component: () =>
      import(
        /* webpackChunkName: "generate-key-pairs" */ "../views/GenerateKeyPairs.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
