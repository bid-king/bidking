const express = require('express');

const router = express.Router();
let timerInterval;

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/chat', async (req, res, next) => {
  res.render('chat');
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
      clearInterval(timerInterval);
    }
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function startCountdownTimer(req, roomId) {
  clearInterval(timerInterval);
  countdownTimer(req, roomId);
}

module.exports = router;
