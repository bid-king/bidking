FROM nginx

WORKDIR /app

RUN mkdir ./build

COPY ./build ./build

# 기존 빌드 파일 삭제
RUN rm -rf /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD [ "nginx", "-g", "daemon off;" ]