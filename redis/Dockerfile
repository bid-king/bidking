FROM redis:latest
COPY ["./redis.conf","/data/redis.conf"]
EXPOSE 16379
ENTRYPOINT ["redis-server","/data/redis.conf"]