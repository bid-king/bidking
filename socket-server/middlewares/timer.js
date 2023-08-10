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
      await redisCli.connect();

      // 1. onLiveItem.itemId 가져오고 -1로 덮어쓰기
      const itemId = await redisCli.get(`auction:${roomId}:onLiveItem:itemId`);
      await redisCli.set(`auction:${roomId}:onLiveItem:itemId`, -1);

      // 2. bidding 확인. 있으면 낙찰, 없으면 유찰
      const userId = await redisCli.get(`item:${itemId}:bidding:userId`);
      const nickname = await redisCli.get(`item:${itemId}:bidding:nickname`);
      const price = await redisCli.get(`item:${itemId}:bidding:price`);
      const time = await redisCli.get(`item:${itemId}:bidding:time`);

      // 3. redis에  afterBidResult 저장
      if (userId === null) {
        // 유찰
        await redisCli.set(`item:${itemId}:afterBidResult:type`, 'fail');
        io.to(`${roomId}`).emit('failBid', { itemId });
      } else {
        // 낙찰
        await redisCli.set(`item:${itemId}:afterBidResult:type`, 'success');
        await redisCli.set(`item:${itemId}:afterBidResult:userId`, userId);
        await redisCli.set(`item:${itemId}:afterBidResult:nickname`, nickname);
        await redisCli.set(`item:${itemId}:afterBidResult:price`, price);
        await redisCli.set(`item:${itemId}:afterBidResult:time`, time);
        io.to(`${roomId}`).emit('successBid', { itemId, userId, nickname, price, time });
      }

      await redisCli.disconnect();
    }
  }

  updateTimer();
  timerInterval[roomId] = setInterval(updateTimer, 1000);
};
