const SocketIO = require('socket.io');
const { startCountdownTimer } = require('../api/newTimer');
const { getRedis } = require('../api/redis');
const { http } = require('../api/http');

module.exports = (server, app) => {
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
      console.log('enterRoom event');

      if (seller === true) {
        roomOwners[`${roomId}`] = socket.id;
      }

      socket.join(roomId);
      socket['nickname'] = nickname;

      io.to(roomId).emit('newUser', { newUser: nickname });

      http.get(`/api/v1/bid/${roomId}/items`).then(itemList => {
        console.log('init item list');
        console.log(itemList);

        io.to(roomId).emit('init', itemList);
      });
    });

    socket.on('leaveRoom', ({ roomId }) => {
      console.log('leaveRoom event');

      if (socket.id === roomOwners[`${roomId}`]) {
        console.log('seller leave room');
        io.to(roomId).emit('roomClosed', { roomId });
      }

      socket.leave(roomId);
    });

    socket.on('roomClosed', ({ roomId }) => {
      console.log('roomClosed event');

      socket.leave(roomId);
    });

    socket.on('chat', ({ roomId, msg }) => {
      console.log('chat event');

      io.to(roomId).emit('chat', { nickname: socket.nickname, msg });
    });

    socket.on('notice', ({ roomId, msg }) => {
      console.log('notice event');

      io.to(roomId).emit('notice', { msg });
    });

    socket.on('start', async ({ roomId }) => {
      console.log('start event');

      const redisCli = app.get('redisCli');
      const itemId = await getRedis(redisCli, `auction:${roomId}:onLiveItem:itemId`);
      const price = await getRedis(redisCli, `auction:${roomId}:onLiveItem:startPrice`);

      if (itemId === undefined || price === undefined) {
        console.error('Redis value not found in start');
      } else {
        console.log('start next item timer');
        io.to(roomId).emit('start', { itemId: Number(itemId), price: Number(price), askingPrice: Number(price) });
        startCountdownTimer(app, roomId);
      }
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');

      for (const roomId in roomOwners) {
        if (roomOwners[roomId] === socket.id) {
          console.log('call spring to end');
          http.post(`/api/v1/bid/${roomId}/end`).then(() => {
            io.to(Number(roomId)).emit('roomClosed', { roomId });
          });
        }
      }
    });
  });
};
