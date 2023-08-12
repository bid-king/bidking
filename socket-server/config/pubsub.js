const redis = require('redis');

module.exports = app => {
  // docker
  // const client = redis.createClient({
  //   url: 'redis://redis:6379',
  // });

  // local
  const subscriber = redis.createClient();
  const io = app.get('io');

  subscriber.subscribe('auction-updates');

  subscriber.on('message', (channel, message) => {
    if (channel === 'auction-updates') {
      const [auctionId, itemId, newPrice] = message.split(':');
      // 갱신된 입찰가를 이용하여 노드 서버에서 처리
      console.log(`Auction ${auctionId} price updated to ${newPrice}`);
      io.to(`${auctionId}`).emit('redis-update', `${itemId}가 ${newPrice}원으로 갱신`);
    }
  });
};
