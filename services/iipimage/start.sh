#! /bin/bash

./setup-gcsfuse.sh

# https://iipimage.sourceforge.io/documentation/server
FILESYSTEM_PREFIX=$FUSE_DIR
/usr/lib/iipimage-server/iipsrv.fcgi --bind 0.0.0.0:9000