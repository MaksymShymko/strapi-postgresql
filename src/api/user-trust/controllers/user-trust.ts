/**
 * user-trust controller
 */

"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::user-trust.user-trust",
  ({ strapi }) => ({
    async test() {
      //   return "Hello from my service!";
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .test();
      return data;
    },

    async updateStatus(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .updateStatus(ctx);
      return data;
    },

    async checkStatus(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .checkStatus(ctx);
      return data;
    },

    async trustedList(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .trustedList(ctx);
      return data;
    },

    async trustedList1(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .trustedList1(ctx);
      return data;
    },

    async trustedList2(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .trustedList2(ctx);
      return data;
    },

    async blockedList(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .blockedList(ctx);
      return data;
    },

    async blockedMeList(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .blockedMeList(ctx);
      return data;
    },

    async ignoreList(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .ignoreList(ctx);
      return data;
    },

    async connectedList(ctx) {
      const { data } = await strapi
        .service("api::user-trust.user-trust")
        .connectedList(ctx);
      return data;
    },
  })
);
