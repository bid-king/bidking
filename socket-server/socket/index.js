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

      io.to(roomId).emit('chat', {
        nickname: 'System',
        msg: `${nickname} 입장`,
      });
    });

    socket.on('leaveRoom', ({ roomId }) => {
      if (socket.id === roomOwners[`${roomId}`]) {
        console.log(socket.adapter.rooms.get(roomId)); // room의 참여자 socket.id
        io.to(roomId).emit('roomClosed');
        // TODO: roomId 방 종료됐다고 알려줌 to Spring
      } else {
        socket.leave(roomId);
        io.to(roomId).emit('chat', { nickname: 'System', msg: `${socket.nickname} 퇴장` });
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

    function getRedis(client, query) {
      return new Promise((resolve, reject) => {
        client.get(query, (err, res) => {
          if (err) reject(err);
          else resolve(res);
        });
      });
    }

    socket.on('start', async ({ roomId }) => {
      const redisCli = app.get('redisCli');

      const itemId = await getRedis(redisCli, `auction:${roomId}:onLiveItem:itemId`);
      const price = await getRedis(redisCli, `auction:${roomId}:onLiveItem:currentPrice`);

      io.to(`${roomId}`).emit('start', { itemId, price });
      startCountdownTimer(app, roomId);

      // try {
      //   const itemId = await new Promise((resolve, reject) => {
      //     redisCli.get(`auction:${roomId}:onLiveItem:itemId`, (error, result) => {
      //       if (error) {
      //         console.error('Error getting itemId:', error);
      //         reject(error);
      //       } else {
      //         console.log('Retrieved itemId:', result);
      //         resolve(result);
      //       }
      //     });
      //   });

      //   const price = await new Promise((resolve, reject) => {
      //     redisCli.get(`auction:${roomId}:onLiveItem:currentPrice`, (error, result) => {
      //       if (error) {
      //         console.error('Error getting price:', error);
      //         reject(error);
      //       } else {
      //         console.log('Retrieved price:', result);
      //         resolve(result);
      //       }
      //     });
      //   });

      //   io.to(roomId).emit('start', { itemId, price });
      //   startCountdownTimer(app, roomId);
      // } catch (error) {
      //   console.error('Error starting auction:', error);
      // }
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });
};
