const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
  });
  app.set('redisCli', client);
};
