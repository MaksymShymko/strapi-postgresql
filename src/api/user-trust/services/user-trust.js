'use strict';

/**
 * user-trust service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-trust.user-trust');
