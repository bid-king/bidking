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

  /*
  // 디버그 신호를 주고받는 네임스페이스
  const debug = io.of('/debug');

  // 네임스페이스의 연결 처리는 제각각이다. 그러므로 연결 콜백을 다시 만들어야 한다.
  debug.on('connection', socket => {
    // 룸의 목록 요청시 / 네임스페이스의 룸 목록 반환
    socket.on('getRooms', () => {
      // 다른 네임스페이스의 객체에도 접근할 수 있다.
      socket.emit('rooms', io.sockets.adapter.rooms);
    });
  });

  io.on('connection', socket => {
    console.log('접속');
    //연결이 들어오면 실행되는 이벤트
    // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.

    //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
    socket.emit('usercount', io.engine.clientsCount);

    // 기본적으로 채팅방 하나에 접속시켜준다.
    socket.join('채팅방 1');

    // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
    // socket.on('message', msg => {
    socket.on('message', (msg, roomname) => {
      //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
      console.log('Message received: ' + msg);

      // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
      // io.emit('message', msg);

      // io.to(방이름).emit으로 특정 방의 소켓들에게 신호를 보낼 수 있다.
      io.to(roomname).emit('message', msg);
    });

    // 룸 전환 신호
    socket.on('joinRoom', (roomname, roomToJoin) => {
      socket.leave(roomname); // 기존의 룸을 나가고
      socket.join(roomToJoin); // 들어갈 룸에 들어간다.

      // 룸을 성공적으로 전환했다는 신호 발송
      socket.emit('roomChanged', roomToJoin);
    });

    socket.on('disconnect', () => {
      console.log('접속 해제');
    });
  });

  */
};
