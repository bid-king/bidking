const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const helmet = require('helmet');
const hpp = require('hpp');
const ejs = require('ejs');
const redis = require('redis');

dotenv.config();
const webSocket = require('./socket');
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 8005);
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
}
const sessionMiddleware = session(sessionOption);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp({ contentSecurityPolicy: false }));
} else {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

const client = redis.createClient({
  socket: {
    host: 'redis-server',
    port: 6379,
  },
});

// client.set('number', 0);
app.get('/redis/test', async (req, res) => {
  // client.get('number', (err, number) => {
  //   client.set('number', parseInt(number) + 1);
  //   res.send('숫자가 1씩 올라갑니다. 숫자: ' + number);
  // });

  await client.connect();
  let number = await client.get('number');
  if (number === null) {
    number = 0;
  }

  console.log(`Number : ${number}`);
  res.send(`숫자가 1씩 올라갑니다. 숫자 : ${number}`);

  await client.set('number', parseInt(number) + 1);
  await client.disconnect();
});

app.use('/live/v1', indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

webSocket(server, app, sessionMiddleware);
