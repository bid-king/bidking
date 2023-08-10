const { createClient } = require('redis');

// Redis 클라이언트 생성 및 반환하는 함수
const createRedisClient = app => {
  const redisClient = createClient(
    {
      host: 'redis-server', // Docker Compose 내에서 정의한 서비스명
      port: 6379, // Redis 서버의 포트
    },
    {
      legacyMode: true, // v3 버전에서 legacyMode 활성화
    }
  );

  app.set('redisClient', redisClient); // app 객체에 저장

  redisClient.on('connect', () => {
    console.info('Redis connected!');
  });

  redisClient.on('error', err => {
    console.error('Redis Client Error', err);
  });

  return redisClient;
};

module.exports = {
  createRedisClient,
};
