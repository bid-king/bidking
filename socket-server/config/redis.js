const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    url: 'redis://redis:6379',
  });
  app.set('redisCli', client);
};
