const http = require('node:http');
const { config } = require('dotenv');

const { logger } = require('../utils/logger');
const pjson = require('../../package.json');
const { expressServer, closeExpresServer } = require('./expressServer');

config();

const runServer = () => {
  const app = expressServer({
    url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
  });
  const proxy = http.createServer(app);
  proxy.listen(process.env.GRAPHQL_PORT, () => {
    logger.info(`${pjson.name} - ${pjson.version}`);
    logger.info('🚀 Server ready at');
    logger.info(`http://${process.env.HOSTNAME}:${process.env.GRAPHQL_PORT}/`);
  });
};
const stopServer = async () => {
  http.close();
  await closeExpresServer();
};

module.exports = { runServer, stopServer };
