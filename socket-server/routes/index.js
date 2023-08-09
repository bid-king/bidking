const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/chat', async (req, res, next) => {
  res.render('chat');
});

router.post('/update', async (req, res, next) => {
  const redisCli = req.app.get('redisCli');
  const io = req.app.get('io');
  const { roomId, itemId } = req.body;

  const userId = await redisCli.get(`item:${itemId}:bidding:userId`);
  const nickname = await redisCli.get(`item:${itemId}:bidding:nickname`);
  const price = await redisCli.get(`item:${itemId}:bidding:price`);
  const time = await redisCli.get(`item:${itemId}:bidding:time`);

  io.to(`${roomId}`).emit('updateBid', { itemId, userId, nickname, price, time });
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
  const { roomId, itemId } = req.body;
  io.to(`${roomId}`).emit('next', itemId);
  res.send('ok');
});

module.exports = router;
