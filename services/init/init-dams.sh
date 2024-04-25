#! /bin/bash

set -e

/docker-run.sh

POSTGRES_CONFIG=/etc/ucdlib-service-init/postgres-dams \
 npm run postgres

TOKEN=$(LOG_LEVEL=error node /service/getToken.js)

FCREPO_HOST=http://gateway:3000 \
FCREPO_JWT=$TOKEN \
  fin io import \
  --import-from-root \
  --fcrepo-path-type=subpath \
  /etc/ucdlib-service-init/fcrepo-dams