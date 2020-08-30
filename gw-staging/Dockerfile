FROM nginx:alpine AS builder

RUN apk add -U python ansible

COPY frontends-playbook.yml upstreams.conf.j2 servers.conf.j2 ./

RUN ansible-playbook -i localhost, frontends-playbook.yml

FROM nginx:alpine

COPY --from=builder generated-upstreams.conf generated-servers.conf /etc/nginx/
COPY nginx.conf /etc/nginx/
