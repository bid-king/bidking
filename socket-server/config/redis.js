const redis = require('redis');

module.exports = app => {
  const client = redis.createClient({
    socket: {
      host: 'redis-server',
      port: 6379,
    },
  });
  app.set('redisCli', client);
};
