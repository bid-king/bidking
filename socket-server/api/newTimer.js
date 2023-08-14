const { getRedis } = require('./redis');

const timerInterval = {};

module.exports.startCountdownTimer = (app, roomId) => {
  clearInterval(timerInterval[roomId]);

  const io = app.get('io');
  let seconds = 10;

  async function updateTimer() {
    io.to(`${roomId}`).emit('time', seconds);
    seconds--;

    if (seconds < 0) {
      clearInterval(timerInterval[roomId]);

      const redisCli = app.get('redisCli');

      const itemId = await getRedis(redisCli, `auction:${roomId}:onLiveItem:itemId`);

      if (itemId === '-1') {
        console.error('현재 경매방에 진행 중인 상품이 존재하지 않습니다.');
        return;
      }

      const biddingKey = `item:${itemId}:bidding`;
      const keysToRetrieve = [
        `${biddingKey}:userId`,
        `${biddingKey}:nickname`,
        `${biddingKey}:price`,
        `${biddingKey}:time`,
      ];

      const [userId, nickname, price, time] = await Promise.all(
        keysToRetrieve.map(key => getRedis(redisCli, key).catch(() => undefined))
      );

      const afterBidResultKey = `item:${itemId}:afterBidResult`;

      // 유찰
      if (userId === undefined) {
        await redisCli.hmset(afterBidResultKey, 'type', 'fail');
        io.to(`${roomId}`).emit('failBid', { itemId });
        return;
      }

      // 낙찰
      if ([itemId, userId, nickname, price, time].every(value => value !== undefined)) {
        const afterBidResultData = {
          type: 'success',
          userId,
          nickname,
          price,
          time,
        };

        await redisCli.hmset(afterBidResultKey, ...Object.entries(afterBidResultData).flat());
        io.to(`${roomId}`).emit('successBid', { itemId, ...afterBidResultData });
        return;
      }

      console.error('Redis value not found');
    }
  }

  updateTimer();
  timerInterval[roomId] = setInterval(updateTimer, 1000);
};
