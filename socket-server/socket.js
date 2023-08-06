const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);

  const room = io.of('/room');
  const chat = io.of('/chat');

  io.use((socket, next) => {
    cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  room.on('connection', socket => {
    console.log('room namespace에 접속');

    socket.on('disconnect', () => {
      console.log('room namespace 접속 해제');
    });
  });

  chat.on('connection', socket => {
    console.log('chat namespace에 접속');

    const req = socket.request;
    const {
      header: { referer },
    } = req;
    const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
    socket.join(roomId);

    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color}님이 입장하셨습니다.`,
    });

    socket.on('disconnect', () => {
      console.log('chat namespace 접속 해제');
      socket.leave(roomId);
    });

    socket.on('chat', data => {
      socket.to(data.room).emit(data);
    });
  });

  io.on('connection', socket => {
    const req = socket.request;
    const {
      headers: { referer },
    } = req;
    const roomId = referer.split('/')[referer.split('/').length - 1];

    socket.join(roomId);
    console.log('socket 연결 성공');

    socket.on('disconnect', () => {
      socket.leave(roomId);
      console.log('socket 연결 해제');
    });
  });
};
