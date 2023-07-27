FROM node:alpine as builder
WORKDIR /app
COPY ./ ./
RUN yarn start
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build  /usr/share/nginx/html