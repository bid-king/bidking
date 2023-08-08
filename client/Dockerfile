FROM nginx
EXPOSE 3000

# 기존 빌드 파일 삭제
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]