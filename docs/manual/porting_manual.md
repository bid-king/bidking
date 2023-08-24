# 포팅 매뉴얼

## 1. 로컬 실행

1. redis-server 실행이 전제되어야 node.js, springboot server가 정상적으로 실행될 수 있습니다.
2. 프로젝트에 `docker-compose.yml` 파일을 실행합니다.
   1. git bash terminal 접속
   2. 프로젝트 하위에서 `cd ./server`명령어를 입력하여 springboot server 디렉토리로 이동합니다.
   3. `./gradlew clean build -x test` 입력 후 빌드를 수행합니다.
   4. docker 앱을 실행합니다.
   5. `cd ../` 를 입력하여 프로젝트 하위 폴더 리스트로 이동 후 `docker-compose build` 명령어로 docker 컨테이너 환경을 build 합니다.
   6. `docker-compose up` 명령어를 실행하여 서비스를 실행합니다.

## 2. EC2 서버 실행

2-1. Nginx

```text
upstream client {
    server localhost:3000;
}

upstream server {
    server localhost:5000;
}

upstream live {
    server localhost:8005;
}

server {
    server_name bidking.live www.bidking.live;

    location / {
        proxy_pass http://client;
    }

    location /api {
        proxy_pass http://server;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }

    location /live {
        proxy_pass http://live;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/bidking.live/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/bidking.live/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = i9a706.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name i9a706.p.ssafy.io;
    return 404; # managed by Certbot
}

```

2. ec2 접속

3. ec2용 docker-compose 파일 업로드 후 명령어 수행

```yaml
version: '3'
services:
  redis-server:
    image: dajeongyun/redis
    hostname: redis
    environment:
      - REDIS_PASSWORD=0613
    ports:
      - '6379:6379'

  react:
    image: dajeongyun/docker-client
    ports:
      - '3000:3000'
    environment: # 윈도우 환경에서 실시간으로 매핑하려면 필요
      - CHOKIDAR_USEPOLLING=true
    stdin_open: true

  springboot:
    image: dajeongyun/docker-springboot-server
    ports:
      - '5000:5000'
    depends_on:
      - 'redis-server'

  nodejs:
    image: dajeongyun/docker-nodejs-server
    ports:
      - '8005:8005'
    depends_on:
      - 'redis-server'
# volumes:
#   redis-data:
```

```shell
docker-compose build

docker-compose up -d

service nginx restart
```
