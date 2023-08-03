/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { logger } = require('../utils/logger');

dotenv.config();
let mongod = null;

const connectDB = async (testing = true) => {
  try {
    let dbUrl = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
    if (process.env.NODE_ENV === 'test' && testing) {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
