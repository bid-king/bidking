const express = require('express');

const router = express.Router();
const timerInterval = {};

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/chat', async (req, res, next) => {
  res.render('chat');
});

router.get('/redis/set', async (req, res, next) => {
  const redisCli = req.app.get('redisCli');
  await redisCli.set('bidking', 'a706');
  res.send('ok');
});

router.get('/redis/get', async (req, res, next) => {
  const redisCli = req.app.get('redisCli');
  const result = await redisCli.get('bidking');
  res.send(result);
});

router.post('/update', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, bidInfo } = req.body;
  io.to(`${roomId}`).emit('updateBid', bidInfo);
  startCountdownTimer(req, roomId);
  res.send('ok');
});

router.post('/success', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, bidInfo } = req.body;
  // const { item, user, price } = bidInfo;
  io.to(`${roomId}`).emit('successBid', bidInfo);
  res.send('ok');
});

router.post('/fail', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, item } = req.body;
  io.to(`${roomId}`).emit('failBid', item);
  res.send('ok');
});

router.post('/next', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, item } = req.body;
  io.to(`${roomId}`).emit('next', item);
  // TODO: 라이브창에 물품 다섯개 주는거 해야됨 req.body
  res.send('ok');
});

router.post('/start', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, item } = req.body;
  io.to(`${roomId}`).emit('start', item);

  startCountdownTimer(req, roomId);

  res.send('ok');
});

function countdownTimer(req, roomId) {
  const io = req.app.get('io');

  let seconds = 10;

  function updateTimer() {
    io.to(`${roomId}`).emit('time', seconds);
    seconds--;

    if (seconds < 0) {
      clearInterval(timerInterval[roomId]);
      // TODO: 자바로 물품 종료 post 보내기 (axios)
      // TODO: response로 온 정보 client로 전송
    }
  }

  updateTimer();
  timerInterval[roomId] = setInterval(updateTimer, 1000);
}

function startCountdownTimer(req, roomId) {
  clearInterval(timerInterval[roomId]);
  countdownTimer(req, roomId);
}

module.exports = router;
