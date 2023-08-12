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

router.post('/next', async (req, res, next) => {
  const io = req.app.get('io');
  const { roomId, itemId } = req.body;
  io.to(`${roomId}`).emit('next', itemId);
  res.send('ok');
});

module.exports = router;
