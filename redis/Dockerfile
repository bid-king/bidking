# 기반 이미지 선택
FROM redis:latest

# Redis 설정 파일을 복사합니다.
COPY ./redis.conf /usr/local/etc/redis/redis.conf

# 컨테이너 내에서 사용할 작업 디렉터리를 설정합니다.
WORKDIR /usr/local/etc/redis

# Redis 서버를 실행할 때 사용할 설정 파일을 지정합니다.
CMD ["redis-server", "redis.conf"]

