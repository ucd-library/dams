ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

ENV DEBIAN_FRONTEND=noninteractive

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/client

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/install-depends.sh /install-depends.sh
RUN chmod +x /install-depends.sh && \
    /install-depends.sh && \
    rm /install-depends.sh

RUN npm install -g @ucd-lib/cork-kube

# App code lives directly at $FIN_SERVICE_ROOT (not a nested subdir) so
# index.js's relative `./models` require resolves to the same path
# FIN_MODEL_ROOT/config.models.rootDir defaults to ($FIN_SERVICE_ROOT/models)
# with no extra env override needed.
WORKDIR ${FIN_SERVICE_ROOT}
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/package-lock.json .
RUN npm install
RUN npm link @ucd-lib/fin-service-utils
RUN npm link @ucd-lib/fin-api

# Models (own package.json, separate deps from the app itself)
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models/package.json models/package.json
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models/package-lock.json models/package-lock.json
RUN cd models && npm install
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models models

# Browser Client Code
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/client client
RUN cd client/public && npm install

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/controllers controllers
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/lib lib
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/index.js .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/config.js .

# development client build, so we have one by default
RUN npm run build
# production client build
RUN npm run dist

# Update fin cache settings
ENV FIN_CACHE_PREDICATES '/^http://digital.ucdavis.edu/schema#/ http://www.loc.gov/premis/rdf/v1#hasMessageDigest \
  http://schema.org/isPartOf http://schema.org/hasPart http://schema.org/associatedMedia http://schema.org/encodesCreativeWork'

# Set fin project name for nice label
ENV PROJECT_NAME 'dams'

ENV GCS_CLIENT_MEDIA_BUCKET=dams-client-media-prod
ENV GCS_TMP_WORKFLOW_BUCKET=dams-prod-workflow-tmp-space

CMD [ "bash", "-c", "tail -f /dev/null"]
