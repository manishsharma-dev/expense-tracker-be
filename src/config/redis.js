const { createClient } = require('redis');
const logger = require('../utils/logger');

let client;

const getRedisClient = async () => {
  if (client?.isOpen) return client;

  client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  client.on('error', (error) => {
    logger.error(`Redis error: ${error.message}`);
  });

  await client.connect();
  logger.info('Redis connected');
  return client;
};

module.exports = { getRedisClient };
