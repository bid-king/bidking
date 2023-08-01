const express = require('express');
const cors = require('cors');
const csrf = require('csrf');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });

const whitelist = ['http://localhost:5000', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed Origin!'));
    }
  },
  credentials: true,
};

router.use(cors(corsOptions));

router.get('/', async (req, res, next) => {
  return res.status(200).send('ok');
});

module.exports = router;
