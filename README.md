To run local

./prepare_remote_rep.sh
docker-compose build/up

To run with remote rep
set REMOTE_REPO with ./example.env
./prepare_remote_rep.sh
docker-compose build/up


Перед запуском всего через docker-compose:
./prepare_remote_rep.sh - скрипт либо генерирует пустой репозиторий локально, либо использует $REMOTE_REPO и делает его clone

convert_md_post_by_slug_to_html.js slug [dir_from] - скрипт, который принимает slug и выводит в stdout результат преобразования index.md в html
convert_md_posts_to_html.sh [dir_from] [dir_to] - скрипт проходит по всем постам и по index.md генерирует index.html, картинки копируются вместе с постами
перед выполнением скрипта npm i
