/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { logger } = require('../utils/logger');

dotenv.config();
let mongod = null;

const connectDB = async ({ testing = true }) => {
  let dbUrl = `${process.env.DB_HOST}/${process.env.DB_NAME}`;

  if (process.env.NODE_ENV === 'test' && testing) {
    mongod = await MongoMemoryServer.create();
    dbUrl = mongod.getUri();
  }
  await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
    logger.info('MongoDB disconnected');
  }
};

module.exports = { connectDB, disconnectDB };
