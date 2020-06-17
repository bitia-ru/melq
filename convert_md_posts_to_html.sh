#!/bin/bash

echo $1
DIR_FROM=$([ "$1" ] && echo "$1" || echo './storage/posts')
DIR_TO=$([ "$2" ] && echo "$2" || echo './published_posts')

if [ ! -d "$DIR_FROM" ]; then
  echo "Directory $DIR_FROM doesn't exist" 1>&2
  exit 1
fi

for POST_DIR in $DIR_FROM/*; do
  if [ -f "$POST_DIR/index.md" ]; then
    SLUG="$(basename $POST_DIR)"
    mkdir -p $DIR_TO/$SLUG
    node ./convert_md_post_by_slug_to_html.js $SLUG $DIR_FROM > $DIR_TO/$SLUG/index.html
    if [ "$?" == 0 ]; then
      echo Post with slug $SLUG converted successfully
    else
      echo Post with slug $SLUG converted failed
    fi
    rsync -a --exclude="index.md" --exclude="manifest.json" --exclude="draft_index.md" $POST_DIR/ $DIR_TO/$SLUG
  fi
done
