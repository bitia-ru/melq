# Run

It's a regular Rails-project, nothing special. Just prepare db and start server: `bin/rails s`

For production run: `docker-compose up`

Start db-only for development: `docker-compose up -d db`

Stop db after work: `docker-compose down`

In case of problems try clean container's state before start db: `docker-compose rm -f`

# Settings

The project has no settings currently.

# Development
## Migrations

Migrations should be backwards compatible.

## Before push

Check code style: `rubocop`

For auto fixing: `rubocop -a`
