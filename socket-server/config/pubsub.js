const redis = require('redis');
const { startCountdownTimer } = require('../api/newTimer');

module.exports = app => {
  const io = app.get('io');

  // docker
  const subscriber = redis.createClient({
    url: 'redis://redis:6379',
  });

  // local
  // const subscriber = redis.createClient();

  subscriber.subscribe('StartAuctionItem');
  subscriber.subscribe('UpdateAuctionPrice');

  subscriber.on('message', (channel, message) => {
    message = message.replace(/"/g, '');

    if (channel === 'StartAuctionItem') {
      const [roomId, itemId, price] = message.split(':');
      console.log(`AuctionRoom ${roomId}의 Item ${itemId}가 ${price}원부터 시작`);
      io.to(Number(roomId)).emit('next', { itemId: Number(itemId), price: Number(price) });
    }

    if (channel === 'UpdateAuctionPrice') {
      const [roomId, itemId, userId, nickname, price, ...time] = message.split(':');
      console.log(
        `AuctionRoom ${roomId}의 Item ${itemId}가 ${nickname}(${userId})에 의해 ${price}원으로 갱신 at ${time.join(
          ':'
        )}`
      );
      io.to(Number(roomId)).emit('updateBid', {
        itemId: Number(itemId),
        userId: Number(userId),
        nickname,
        price: Number(price),
        time: time.join(':'),
      });

      startCountdownTimer(app, Number(roomId));
    }
  });
};
