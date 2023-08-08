const express = require('express');

const router = express.Router();

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

router.get('/redis/set/json', async (req, res, next) => {
  const redisCli = req.app.get('redisCli');
  const data = {
    model: 'Deimosasdfasf',
    brand: 'Ergonom',
    type: 'Enduro bikes',
    price: 4972,
  };
  const result = await redisCli.set('bike:1', JSON.stringify(data));
  res.send(result);
});

router.get('/redis/get/json', async (req, res, next) => {
  const redisCli = req.app.get('redisCli');
  const fields = await redisCli.get('bike:1');
  res.send(JSON.parse(fields));
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
  const { roomId, itemId } = req.body;
  io.to(`${roomId}`).emit('next', itemId);
  res.send('ok');
});

module.exports = router;
