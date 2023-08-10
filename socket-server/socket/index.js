const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');
const { startCountdownTimer } = require('../middlewares/timer');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  app.set('io', io);

  const roomOwners = {};

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
      const redisCli = app.get('redisCli');
      await redisCli.connect();

      const itemId = await redisCli.get(`auction:${roomId}:onLiveItem:itemId`);
      const price = await redisCli.get(`auction:${roomId}:onLiveItem:currentPrice`);

      await redisCli.disconnect();

      io.to(`${roomId}`).emit('start', { itemId, price });
      startCountdownTimer(app, roomId);
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });
};
