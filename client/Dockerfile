# Build Stage
FROM node:18-alpine as builder
WORKDIR /app
RUN apk update && apk add --no-cache yarn
COPY ./ ./
RUN yarn
RUN yarn build

# Production Stage
FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
