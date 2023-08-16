const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const hpp = require('hpp');
const redisSub = require('./config/pubsub');
const https = require('https');
const fs = require('fs');

dotenv.config();
const redis = require('./config/redis');
const webSocket = require('./socket');

const app = express();
app.set('port', process.env.PORT || 8005);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

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

redis(app);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
});

// SSL 인증서와 개인 키 파일의 경로
const privateKeyPath = './ssl/privkey.pem';
const certificatePath = './ssl/fullchain.pem';

// SSL 옵션 설정
const sslOptions = {
  key: fs.readFileSync(privateKeyPath),
  cert: fs.readFileSync(certificatePath),
};

// Express 애플리케이션을 HTTPS로 실행
const server = https.createServer(sslOptions, app);

server.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

webSocket(server, app);
redisSub(app);
