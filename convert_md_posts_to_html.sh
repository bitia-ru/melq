#!/bin/bash

DIR_FROM=${1:-./storage/posts}
shift
DIR_TO=${1:-./published_posts}

if [[ ! -d "$DIR_FROM" ]]; then
  echo "Directory $DIR_FROM doesn't exist" 1>&2
  exit 1
fi

RESULT=0
for POST_DIR in "$DIR_FROM"/*; do
  if [[ -f "$POST_DIR/index.md" ]]; then
    SLUG="$(basename $POST_DIR)"
    mkdir -p "$DIR_TO/$SLUG"
    node ./convert_md_post_by_slug_to_html.js "$SLUG" "$DIR_FROM" > "$DIR_TO/$SLUG/index.html"
    STATUS=$?
    [[ $STATUS = 1 || $RESULT = 1 ]] && RESULT=1 || RESULT=0
    if (( $STATUS == 0 )); then
      echo Post with slug $SLUG converted successfully
    else
      echo Post with slug $SLUG converted failed
    fi
    rsync -a --exclude="index.md" --exclude="manifest.json" --exclude="draft_index.md" "$POST_DIR/" "$DIR_TO/$SLUG"
  fi
done

exit $RESULT

