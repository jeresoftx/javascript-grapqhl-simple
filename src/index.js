const { config } = require('dotenv');

const { startServer } = require('./server/server');

config();

startServer({
  url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
});
