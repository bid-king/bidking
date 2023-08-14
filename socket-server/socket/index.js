const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');
const { startCountdownTimer } = require('../api/timer');
const { getRedis } = require('../api/redis');
const { http } = require('../api/http');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: process.env.NODE_APP_CLIENT_ROOT,
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

      http.get(`/api/v1/bid/${roomId}/items`).then(itemList => {
        io.to(roomId).emit('init', itemList);
      });
    });

    socket.on('leaveRoom', ({ roomId }) => {
      if (socket.id === roomOwners[`${roomId}`]) {
        console.log(socket.adapter.rooms.get(roomId)); // room의 참여자 socket.id
        io.to(roomId).emit('roomClosed');
      } else {
        socket.leave(roomId);
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
      const itemId = await getRedis(redisCli, `auction:${roomId}:onLiveItem:itemId`);
      const price = await getRedis(redisCli, `auction:${roomId}:onLiveItem:startPrice`);

      if (itemId === undefined || price === undefined) {
        console.error('Redis value not found');
      } else {
        io.to(`${roomId}`).emit('start', { itemId, price });
        startCountdownTimer(app, roomId);
      }
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });
};
