const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
  });
  app.set('redisCli', client);
};
