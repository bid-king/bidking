const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  app.set('io', io);

  const redisCli = app.get('redisCli');

  const roomOwners = {};
  const timerInterval = {};

  io.on('connection', socket => {
    console.log('socket 접속');

    socket.on('enterRoom', ({ nickname, roomId, seller }) => {
      if (seller === true) {
        roomOwners[`${roomId}`] = socket.id;
      }

      socket.join(roomId);
      socket['nickname'] = nickname;

      // TODO: roomId에 해당하는 itemList 요청 to Spring
      // GET /api/v1/auctions/{auctionId}/items

      io.to(roomId).emit('chat', { nickname: 'System', msg: `${nickname} 입장` });
    });

    socket.on('leaveRoom', ({ roomId }) => {
      if (socket.id === roomOwners[`${roomId}`]) {
        console.log(socket.adapter.rooms.get(roomId)); // room의 참여자 socket.id
        io.to(roomId).emit('roomClosed');
        // TODO: roomId 방 종료됐다고 알려줌 to Spring
      } else {
        socket.leave(roomId);
        io.to(roomId).emit('chat', { nickname: 'System', msg: `${nickname} 퇴장` });
      }
    });

    socket.on('roomClosed', ({ roomId }) => {
      socket.leave(roomId);
    });

    socket.on('chat', ({ roomId, msg }) => {
      io.to(roomId).emit('chat', { nickname: socket.nickname, msg });
    });

    socket.on('notice', ({ roomId, msg }) => {
      io.to(roomId).emit('notice', { msg });
    });

    socket.on('start', async ({ roomId }) => {
      const itemId = await redisCli.get(`auction:${roomId}:onLiveItem:itemId`);
      const price = await redisCli.get(`auction:${roomId}:onLiveItem:currentPrice`);
      io.to(`${roomId}`).emit('start', { itemId, price });
      startCountdownTimer(app, roomId);
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });

  function countdownTimer(app, roomId) {
    const io = app.get('io');
    let seconds = 10;

    async function updateTimer() {
      io.to(`${roomId}`).emit('time', seconds);
      seconds--;

      if (seconds < 0) {
        clearInterval(timerInterval[roomId]);

        const redisCli = app.get('redisCli');

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
      }
    }

    updateTimer();
    timerInterval[roomId] = setInterval(updateTimer, 1000);
  }

  function startCountdownTimer(app, roomId) {
    clearInterval(timerInterval[roomId]);
    countdownTimer(app, roomId);
  }
};
