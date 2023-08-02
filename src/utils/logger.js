/* eslint-disable import/no-extraneous-dependencies */
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

module.exports = { logger };
