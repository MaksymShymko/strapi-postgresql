/**
 * user-trust service
 */

"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::user-trust.user-trust",
  ({ strapi }) => ({
    // GET /usertrust/test
    async test() {
      return { data: "user-trust testing!" };
    },

    // POST /usertrust/update-status/:status/:strangeId
    // @param status
    // @param strangeId
    async updateStatus(ctx) {
      const { status, strangeId } = ctx.params;
      const userId = ctx.state.user.id;

      try {
        if (userId == strangeId)
          return { data: "Please don't touch yourself!" };

        let trustRecord = await strapi
          .query("api::user-trust.user-trust")
          .findOne({
            where: {
              user1: userId,
              user2: strangeId,
            },
          });

        if (!trustRecord) {
          trustRecord = await strapi
            .query("api::user-trust.user-trust")
            .create({
              data: {
                user1: userId,
                user2: strangeId,
                trustStatus: status,
              },
            });
        } else {
          trustRecord = await strapi
            .query("api::user-trust.user-trust")
            .update({
              where: {
                id: trustRecord.id,
              },
              data: {
                trustStatus: status,
              },
            });
        }
        return {
          data: {
            success: true,
            user1: trustRecord.user1,
            user2: trustRecord.user2,
            status: trustRecord.trustStatus,
          },
        };
      } catch (error) {
        return { data: error };
      }
    },

    // GET /check-status/:strangeId
    // @param strangeId
    async checkStatus(ctx) {
      const { strangeId } = ctx.params;
      const userId = ctx.state.user.id;
      const trustRecord = await strapi
        .query("api::user-trust.user-trust")
        .findOne({
          where: {
            $or: [
              { user1: userId, user2: strangeId },
              { user1: strangeId, user2: userId },
            ],
          },
        });

      if (!trustRecord) return { data: "no trust record" };

      return { data: trustRecord.trustStatus };
    },

    // GET /trusted-list
    async trustedList(ctx) {
      const userId = await ctx.state.user.id;
      const trustRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user1: userId,
            trustStatus: "trusts",
          },
        });

      // return { data: trustRecords };
      const trustedUsers = Promise.all(
        trustRecords.map(async (record) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId: record.user2,
            },
          });
          return user;
        })
      );
      return { data: trustedUsers };
    },

    // GET /trusted-list1
    async trustedList1(ctx) {
      const userId = await ctx.state.user.id;
      const trustRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user2: userId,
            trustStatus: "trusts",
          },
        });

      // return { data: trustRecords };
      const trustedUsers = Promise.all(
        trustRecords.map(async (record) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId: record.user1,
            },
          });
          return user;
        })
      );
      return { data: trustedUsers };
    },

    // GET /trusted-list2
    async trustedList2(ctx) {
      const userId = await ctx.state.user.id;
      const trustRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user2: userId,
            trustStatus: "trusts",
          },
        });

      const trustedUserIds = trustRecords.map((record) => record.user1);

      const ignoredRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user1: userId,
            trustStatus: "ignored",
          },
        });

      const ignoredUserIds = ignoredRecords.map((record) => record.user2);

      const relevantUserIds = trustedUserIds.filter(
        (id) => !ignoredUserIds.includes(id)
      );

      const relevantUsers = await Promise.all(
        relevantUserIds.map(async (userId) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId,
            },
          });
          return user;
        })
      );
      return { data: relevantUsers };
    },

    // GET /blocked-list
    async blockedList(ctx) {
      const userId = await ctx.state.user.id;

      const blockedRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user1: userId,
            trustStatus: "blocked",
          },
        });
      // return { data: blockedRecords };

      const blockedUser = await Promise.all(
        blockedRecords.map(async (record) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId: record.user2,
            },
          });
          return user;
        })
      );

      return { data: blockedUser };
    },

    // GET /blocked-md-list
    async blockedMeList(ctx) {
      const userId = await ctx.state.user.id;

      const blockedMeRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user2: userId,
            trustStatus: "blocked",
          },
        });
      // return { data: blockedRecords };

      const blockedMeUser = await Promise.all(
        blockedMeRecords.map(async (record) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId: record.user1,
            },
          });
          return user;
        })
      );

      return { data: blockedMeUser };
    },

    // GET /ignored-list
    async ignoredList(ctx) {
      const userId = await ctx.state.user.id;
      const trustMeRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user2: userId,
            trustStatus: "trusts",
          },
        });

      const trustMeUserIds = trustMeRecords.map((record) => record.user1);

      const ignoredRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user1: userId,
            trustStatus: "ignored",
          },
        });

      const ignoredUserIds = ignoredRecords.map((record) => record.user2);

      const relevantUserIds = trustMeUserIds.filter((id) =>
        ignoredUserIds.includes(id)
      );

      const relevantUsers = await Promise.all(
        relevantUserIds.map(async (userId) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId,
            },
          });
          return user;
        })
      );
      return { data: relevantUsers };
    },

    // GET /connected-list
    async connectedList(ctx) {
      const userId = await ctx.state.user.id;
      const trustsRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user1: userId,
            trustStatus: "trusts",
          },
        });

      const trustsUserIds = trustsRecords.map((record) => record.user2);

      const trustMeRecords = await strapi
        .query("api::user-trust.user-trust")
        .findMany({
          where: {
            user2: userId,
            trustStatus: "trusts",
          },
        });

      const trustMeUserIds = trustMeRecords.map((record) => record.user1);

      const mutuallyTrustUserIds = trustsUserIds.filter((id) =>
        trustMeUserIds.includes(id)
      );

      const mutuallyTrustUsers = await Promise.all(
        mutuallyTrustUserIds.map(async (userId) => {
          const user = await strapi.query("api::user-info.user-info").findOne({
            where: {
              userId,
            },
          });
          return user;
        })
      );
      return { data: mutuallyTrustUsers };
    },
  })
);
