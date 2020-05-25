FROM node:11-alpine AS npm_installer

RUN npm config set unsafe-perm true

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm i --production

FROM npm_installer AS builder

COPY --from=npm_installer /app/node_modules /app/node_modules

COPY . /app

ARG apiUrl
ARG clientId
ARG sentryDsn
ENV API_URL ${apiUrl}
ENV CLIENT_ID ${clientId}
ENV SENTRY_DSN ${sentryDsn}

RUN npm run build --production

FROM nginx:1.15-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist /app

COPY docker/configs/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
