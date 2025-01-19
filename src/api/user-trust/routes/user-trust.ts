/**
 * user-trust router
 */

import { factories } from "@strapi/strapi";

// export default factories.createCoreRouter('api::user-trust.user-trust');

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/usertrust/test",
      handler: "user-trust.test",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/usertrust/update-status/:status/:strangeId",
      handler: "user-trust.updateStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/check-status/:strangeId",
      handler: "user-trust.checkStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/trusted-list",
      handler: "user-trust.trustedList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/trusted-list1",
      handler: "user-trust.trustedList1",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/trusted-list2",
      handler: "user-trust.trustedList2",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/blocked-list",
      handler: "user-trust.blockedList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/blocked-me-list",
      handler: "user-trust.blockedMeList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/ignore-list",
      handler: "user-trust.ignoreList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/connected-list",
      handler: "user-trust.connectedList",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
