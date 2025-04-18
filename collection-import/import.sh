#! /bin/bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

export GIT_DISCOVERY_ACROSS_FILESYSTEM=1
ROOT_DIR="/data"
ROOT_GIT_HOST="https://github.com/ucd-library"
GOOGLE_APPLICATION_CREDENTIALS="/etc/fin/service-account.json" 

if [[ -z "$COLLECTION_NAME" ]]; then
  echo "COLLECTION_NAME is not set"
  exit 1
fi
if [[ -z "$GCS_BINARY_BACKUP_BUCKET" ]]; then
  echo "GCS_BINARY_BACKUP_BUCKET is not set"
  exit 1
fi
if [[ -z "$FIN_URL" ]]; then
  echo "FIN_URL is not set"
  exit 1
fi
if [[ ! -d $ROOT_DIR ]]; then
  echo "$ROOT_DIR directory does not exist"
  exit 1
fi
if [[ ! -f $GOOGLE_APPLICATION_CREDENTIALS ]]; then
  echo "$GOOGLE_APPLICATION_CREDENTIALS file does not exist"
  exit 1
fi

METADATA_REPO="dams-${COLLECTION_NAME}-metadata"
METADATA_DIR="$ROOT_DIR/$METADATA_REPO"
GIT_URL="$ROOT_GIT_HOST/$METADATA_REPO.git"

echo "Importing collection $COLLECTION_NAME from $GCS_BINARY_BACKUP_BUCKET to $FIN_URL"
if [[ ! -z $FIN_AC_AGENT ]]; then
  echo "Using fin ac agent: $FIN_AC_AGENT"
  FIN_AC_AGENT="--agent $FIN_AC_AGENT"
else
  echo "Not using fin ac agent"
fi

if [[ ! -d $METADATA_DIR ]]; then
  echo "Cloning $GIT_URL to $METADATA_DIR"
  cd $ROOT_DIR
  git clone $GIT_URL
else
  echo "Updating $METADATA_DIR"
  cd $METADATA_DIR
  git pull 
fi

cd $METADATA_DIR

echo "Authenticating with Google Cloud: $GOOGLE_APPLICATION_CREDENTIALS"
gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS

if [[ $IGNORE_BINARY_SYNC != 'true' ]]; then
  echo "Syncing binary backups from gs://$GCS_BINARY_BACKUP_BUCKET"
  gsutil -m -q rsync -d -c -J -r -u -y "(^\.git|.*\.jsonld\.json$)" gs://$GCS_BINARY_BACKUP_BUCKET/$COLLECTION_NAME .
else
  echo "Ignoring binary sync"
fi

echo "Importing collection $COLLECTION_NAME"
fin config set host $FIN_URL

echo "Setting service account token"
node $SCRIPT_DIR/setToken.js

if [[ $DRY_RUN = 'true' ]]; then
  fin io import $FIN_AC_AGENT --debug-sha-changes --dry-run --ag-import-strategy version-all .
else
  fin io import $FIN_AC_AGENT --ag-import-strategy version-all .
fi