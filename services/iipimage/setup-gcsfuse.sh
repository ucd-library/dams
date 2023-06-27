#! /bin/bash

set -e

if [[ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]]; then
  echo "GOOGLE_APPLICATION_CREDENTIALS is not set"
  exit 1
fi
if [[ -z "$FUSE_DIR" ]]; then
  echo "FUSE_DIR is not set"
  exit 1
fi
if [[ -z "$GCS_BUCKET" ]]; then
  echo "GCS_BUCKET is not set"
  exit 1
fi

mkdir -p $FUSE_DIR

echo "Activating service account"
gcloud auth activate-service-account --key-file $GOOGLE_APPLICATION_CREDENTIALS

echo "Mounting $GCS_BUCKET to $FUSE_DIR"
gcsfuse --implicit-dirs -o allow_other $GCS_BUCKET $FUSE_DIR &

# fusermount -u /etc/gcs-fuse/
# gcsfuse --implicit-dirs --uid 33 --gid 33 --foreground --debug_fs --debug_fuse --debug_fuse_errors -o allow_other  dams-client-media-dev  /etc/gcs-fuse