const redis = require('redis');

module.exports = app => {
  // docker
  const client = redis.createClient({
    url: 'redis://redis:6379',
  });

  // local
  // const client = redis.createClient();
  app.set('redisCli', client);
};
