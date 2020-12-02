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
    path: "/encode-asymmetric",
    name: "EncodeAsymmetric",
    component: () =>
      import(
        /* webpackChunkName: "encode-asymmetric" */ "../views/EncodeAsymmetric.vue"
      )
  },
  {
    path: "/decode-asymmetric",
    name: "DecodeAsymmetric",
    component: () =>
      import(
        /* webpackChunkName: "decode-asymmetric" */ "../views/DecodeAsymmetric.vue"
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
  routes,
  linkActiveClass: "is-active"
});

export default router;
