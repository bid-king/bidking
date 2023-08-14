const { getRedis } = require('./redis');

const timerInterval = {};

module.exports.startCountdownTimer = (app, roomId) => {
  clearInterval(timerInterval[roomId]);

  const io = app.get('io');
  let seconds = 10;

  async function updateTimer() {
    io.to(roomId).emit('time', seconds);
    seconds--;

    if (seconds < 0) {
      clearInterval(timerInterval[roomId]);

      const redisCli = app.get('redisCli');

      // 1. onLiveItem.itemId 가져오고 -1로 덮어쓰기
      const itemId = await getRedis(redisCli, `auction:${roomId}:onLiveItem:itemId`);

      if (itemId === '-1') {
        console.error('현재 경매방에 진행 중인 상품이 존재하지 않습니다.');
        return;
      }

      await redisCli.set(`auction:${roomId}:onLiveItem:itemId`, -1);

      // 2. bidding 확인. 있으면 낙찰, 없으면 유찰
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

      // 3. redis에 afterBidResult 저장
      const afterBidResultKey = `auction:${roomId}:AfterBidResult`;
      const afterBidResultData = {};

      if (userId === undefined) {
        // 유찰
        afterBidResultData = {
          type: 'fail',
        };
        io.to(`${roomId}`).emit('failBid', { itemId: Number(itemId) });
      } else if ([itemId, nickname, price, time].every(value => value !== undefined)) {
        // 낙찰
        afterBidResultData = {
          type: 'success',
          userId,
          nickname,
          price,
          time,
        };
        io.to(`${roomId}`).emit('successBid', {
          itemId: Number(itemId),
          userId: Number(userId),
          nickname,
          price: Number(price),
          time,
        });
      } else {
        // 잘못된 값이 있는 경우
        console.error('Redis value not found in timer');
        return;
      }
    }
  }

  updateTimer();
  timerInterval[roomId] = setInterval(updateTimer, 1000);
};
