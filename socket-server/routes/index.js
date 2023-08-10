const express = require('express');
const { startCountdownTimer } = require('../middlewares/timer');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/chat', async (req, res, next) => {
  res.render('chat');
});

router.post('/update', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, itemId } = req.body;

  const redisCli = req.app.get('redisCli');
  await redisCli.connect();

  const userId = await redisCli.get(`item:${itemId}:bidding:userId`);
  const nickname = await redisCli.get(`item:${itemId}:bidding:nickname`);
  const price = await redisCli.get(`item:${itemId}:bidding:price`);
  const time = await redisCli.get(`item:${itemId}:bidding:time`);

  await redisCli.disconnect();

  io.to(`${roomId}`).emit('updateBid', { itemId, userId, nickname, price, time });

  startCountdownTimer(req.app, roomId);
  res.send('ok');
});

router.post('/next', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, itemId } = req.body;
  io.to(`${roomId}`).emit('next', itemId);
  res.send('ok');
});

module.exports = router;
