#! /bin/bash

if [[ $USE_LOCAL_GCSFUSE == "true" ]]; then
  echo "Using local gcsfuse mount"
  ./setup-gcsfuse.sh
else
  echo "Expecting gcsfuse mount already available"
fi

# https://iipimage.sourceforge.io/documentation/server
# FILESYSTEM_PREFIX=$FUSE_DIR
# /usr/lib/iipimage-server/iipsrv.fcgi --bind 0.0.0.0:9000

echo "starting lighttpd"
service lighttpd start

tail -f /dev/null