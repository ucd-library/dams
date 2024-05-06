ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

# TODO: https://cloud.google.com/storage/docs/gsutil/addlhelp/CRC32CandInstallingcrcmod
# Ensure crcmod is installed for gsutil

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/fin




# Client Code
RUN mkdir -p ${FIN_SERVICE_ROOT}/ucd-lib-client

WORKDIR ${FIN_SERVICE_ROOT}/ucd-lib-client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package-lock.json .
RUN npm install 
RUN npm link @ucd-lib/fin-service-utils
RUN npm link @ucd-lib/fin-api

# DAMS cli
COPY cli /dams-cli
RUN cd /dams-cli && npm install && npm link && npm link @ucd-lib/fin-api
# RUN ln -s /dams-cli/bin/dams.js /usr/local/bin/damss

# Models 
WORKDIR ${FIN_SERVICE_ROOT}/models
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models/package-lock.json .
RUN npm install
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models ${FIN_SERVICE_ROOT}/models

# Browser Client Code
WORKDIR ${FIN_SERVICE_ROOT}/ucd-lib-client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client client
RUN cd client/public && npm install

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/controllers controllers
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/lib lib
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/models models
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/index.js .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/config.js .

# development client build, so we have one by default
RUN npm run build
# production client build
RUN npm run dist

WORKDIR ${FIN_SERVICE_ROOT}

# Update fin cache settings
ENV FIN_CACHE_PREDICATES '/^http://digital.ucdavis.edu/schema#/ http://www.loc.gov/premis/rdf/v1#hasMessageDigest \
  http://schema.org/isPartOf http://schema.org/hasPart http://schema.org/associatedMedia http://schema.org/encodesCreativeWork'

# Set fin project name for nice label 
ENV PROJECT_NAME 'dams'

ARG APP_VERSION=-1
ENV APP_VERSION ${APP_VERSION}
ARG BUILD_NUM=-1
ENV BUILD_NUM ${BUILD_NUM}
ARG UCD_DAMS_REPO_BRANCH=unknown
ENV UCD_DAMS_REPO_BRANCH ${UCD_DAMS_REPO_BRANCH}
ARG UCD_DAMS_REPO_TAG=unknown
ENV UCD_DAMS_REPO_TAG ${UCD_DAMS_REPO_TAG}
ARG UCD_DAMS_REPO_SHA=unknown
ENV UCD_DAMS_REPO_SHA ${UCD_DAMS_REPO_SHA}
ARG UCD_DAMS_DEPLOYMENT_SHA=unknown
ENV UCD_DAMS_DEPLOYMENT_SHA ${UCD_DAMS_DEPLOYMENT_SHA}
ARG UCD_DAMS_DEPLOYMENT_BRANCH=unknown
ENV UCD_DAMS_DEPLOYMENT_BRANCH ${UCD_DAMS_DEPLOYMENT_BRANCH}
ARG UCD_DAMS_DEPLOYMENT_TAG=unknown
ENV UCD_DAMS_DEPLOYMENT_TAG ${UCD_DAMS_DEPLOYMENT_TAG}
ARG FIN_SERVER_IMAGE=unknown
ENV FIN_SERVER_IMAGE ${FIN_SERVER_IMAGE}

ENV GCS_CLIENT_MEDIA_BUCKET=dams-client-media-prod
ENV GCS_TMP_WORKFLOW_BUCKET=dams-prod-workflow-tmp-space

CMD [ "bash", "-c", "tail -f /dev/null"]