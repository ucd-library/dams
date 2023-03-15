#! /bin/bash

# Hack fix
cp public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen_exit.svg \
   public/node_modules/@internetarchive/bookreader/BookReader/icons/fullscreen-exit.svg

webpack --watch