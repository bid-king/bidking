const express = require('express');
const { startCountdownTimer } = require('../api/timer');
const { getRedis } = require('../api/redis');

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

  const userId = await getRedis(redisCli, `item:${itemId}:bidding:userId`);
  const nickname = await getRedis(redisCli, `item:${itemId}:bidding:nickname`);
  const price = await getRedis(redisCli, `item:${itemId}:bidding:price`);
  const time = await getRedis(redisCli, `item:${itemId}:bidding:time`);

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
