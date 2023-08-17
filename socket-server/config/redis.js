const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
    password: "0613"
  });
  app.set('redisCli', client);
};
