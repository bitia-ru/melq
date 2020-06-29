#!/bin/sh -l

set -e

cd /app

#bin/rake db:create db:migrate RAILS_ENV=test

#bin/bundle exec rspec

bin/bundle exec rubocop

