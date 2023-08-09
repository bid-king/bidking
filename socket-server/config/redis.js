// const dotenv = require('dotenv');
const { createClient } = require('redis');

module.exports = app => {
  // Redis 연결
  const redisClient = createClient({
    // redis[s]://[[username][:password]@][host][:port][/db-number]
    // url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    host: 'redis-server',
    port: 16379,
    legacyMode: true, // 반드시 설정 !!
  });
  
  redisClient.on('connect', () => {
    console.info('Redis connected!');
  });
  
  redisClient.on('error', err => {
    console.error('Redis Client Error', err);
  });

  // redis v4 연결 (비동기)re
  // redisClient.connect();
  
  // 기본 redisClient 객체 사용
  app.set('redisClient', redisClient);
  
  // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
  const redisCli = redisClient.v4;
  
  app.set('redisCli', redisCli);
};


