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
      socket['nickname'] = nickname;
      io.to(roomId).emit('chat', { nickname: 'System', msg: `${nickname} 입장` });
    });

    socket.on('leaveRoom', data => {
      const { roomId } = data;
      socket.leave(data.roomId);
      io.to(roomId).emit('chat', { nickname: 'System', msg: `${nickname} 퇴장` });
    });

    socket.on('chat', data => {
      const { roomId, msg } = data;
      io.to(roomId).emit('chat', { nickname: socket.nickname, msg });
    });

    socket.on('notice', data => {
      const { roomId, msg } = data;
      io.to(roomId).emit('notice', msg);
    });

    socket.on('disconnect', () => {
      console.log('socket 접속 해제');
    });
  });
};
