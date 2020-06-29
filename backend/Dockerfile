FROM ruby:2.5.3-alpine3.8 AS base

# install packages needed for Rails
RUN apk add -U gmp-dev zlib libressl tzdata

# install project-specific packages
RUN apk add -U libpq postgresql-client imagemagick
WORKDIR /app

FROM base AS builder

RUN apk add -U gcc g++ make zlib-dev libressl-dev postgresql-dev git

COPY Gemfile Gemfile.lock ./

# Uncomment this lines to update Gemfile.lock:
# FROM builder as gem_updater
# RUN bundle install

FROM builder as gem_installer
RUN bundle install --frozen --no-cache --clean && rm -rf /usr/local/bundle/cache

FROM base AS app

COPY --from=gem_installer /usr/local/bundle /usr/local/bundle

COPY Gemfile Gemfile.lock ./
COPY Rakefile config.ru ./
COPY app ./app
COPY bin ./bin
COPY config ./config
COPY db ./db
COPY lib ./lib
COPY public ./public

RUN mkdir ./tmp ./log ./storage
RUN mkdir ./tmp/pids

COPY .rubocop.yml ./
COPY ci/ci_entrypoint.sh /

ENTRYPOINT ["bundle", "exec"]

CMD ["bin/rails", "s"]
