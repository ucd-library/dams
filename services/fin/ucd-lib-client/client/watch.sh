#! /bin/bash

set -e
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $ROOT_DIR

# Hack fix
cp public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen_exit.svg \
   public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen-exit.svg

webpack --watch