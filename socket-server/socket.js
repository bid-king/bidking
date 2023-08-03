const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);

  io.on('connection', socket => {
    console.log('socket 접속');

    socket.on('enterRoom', data => {
      const { nickname, roomId } = data;
      socket.join(roomId);
      io.to(roomId).emit('message', `${nickname} 입장`);
    });

    socket.on('leaveRoom', data => {
      const { nickname, roomId } = data;
      socket.leave(data.roomId);
      io.to(roomId).emit('message', `${nickname} 퇴장`);
    });

    socket.on('message', data => {
      const { nickname, roomId, msg } = data;
      io.to(roomId).emit('message', `${nickname} : ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });
};
