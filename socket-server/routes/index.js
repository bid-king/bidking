const express = require('express');

const router = express.Router();

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

router.post('/start', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, item } = req.body;
  io.to(`${roomId}`).emit('start', item);
  res.send('ok');
});

module.exports = router;
