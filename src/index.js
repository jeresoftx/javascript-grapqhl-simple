const { config } = require('dotenv');

const { sartServer } = require('./server/server');

config();

sartServer({
  url: `${process.env.DB_HOST}/${process.env.DB_NAME}`,
});
