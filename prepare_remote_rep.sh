#!/bin/bash

if [ -n "$REMOTE_REPO" ]
then
  mkdir -p storage
  cd ../storage
  git clone $REMOTE_REPO posts
else
  mkdir -p posts
  cd posts
  git init --bare
  cd ..
  mkdir -p storage
  cd ./storage
  git clone ../posts
fi
cd posts
if [ -n "$REMOTE_NAME" ]
then
  git remote set-url $REMOTE_NAME ./posts
else
  git remote set-url origin ./posts
fi

