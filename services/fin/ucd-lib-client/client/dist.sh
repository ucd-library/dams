#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR

rm -rf dist
mkdir dist

cp -r public/images dist/
cp -r public/fonts dist/

cp public/index.html dist/
cp public/jwt.html dist/
cp public/manifest.json dist/

# Hack fix
cp public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen_exit.svg \
   public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen-exit.svg

webpack --config webpack-dist.config.js
webpack --config admin-ui-ext/webpack-dist.config.js