ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

# TODO: https://cloud.google.com/storage/docs/gsutil/addlhelp/CRC32CandInstallingcrcmod
# Ensure crcmod is installed for gsutil

ENV DEBIAN_FRONTEND=noninteractive

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/fin

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/install-depends.sh /install-depends.sh
RUN chmod +x /install-depends.sh && \
    /install-depends.sh && \
    rm /install-depends.sh
# RUN apt update && \
#     apt install -y \
#       apt-transport-https \
#       ca-certificates \
#       gnupg \
#       lsb-release \
#       gcc \
#       python3-dev \
#       python3-setuptools \
#       python3-pip && \
#     pip3 uninstall crcmod && \
#     pip3 install --no-cache-dir -U crcmod && \
#     apt uninstall -y gcc python3-dev python3-pip && \
#     rm -rf /var/lib/apt/lists/* && \
#     apt-get clean

# RUN mkdir -p /etc/apt/keyrings
# RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
# RUN echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list

# RUN apt-get update && apt-get install -y \
#   kubectl \
#   google-cloud-sdk-gke-gcloud-auth-plugin

# Client Code
RUN mkdir -p ${FIN_SERVICE_ROOT}/ucd-lib-client/admin-ui-ext

WORKDIR ${FIN_SERVICE_ROOT}/ucd-lib-client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package-lock.json .
RUN npm install 
RUN npm link @ucd-lib/fin-service-utils
RUN npm link @ucd-lib/fin-api

RUN npm install -g @ucd-lib/cork-kube

# DAMS cli
COPY cli /dams-cli
RUN cd /dams-cli && npm install && npm link && npm link @ucd-lib/fin-api
# RUN ln -s /dams-cli/bin/dams.js /usr/local/bin/damss

# Collection Import
COPY collection-import /collection-import

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

# Copy Service Definitions
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/service-defs/iiif.jsonld.json /etc/fin/services/iiif.jsonld.json 
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/service-defs/kibana.jsonld.json /etc/fin/services/kibana.jsonld.json
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/service-defs/ucd-lib-client.jsonld.json /etc/fin/services/ucd-lib-client.jsonld.json

WORKDIR ${FIN_SERVICE_ROOT}

# Update fin cache settings
ENV FIN_CACHE_PREDICATES '/^http://digital.ucdavis.edu/schema#/ http://www.loc.gov/premis/rdf/v1#hasMessageDigest \
  http://schema.org/isPartOf http://schema.org/hasPart http://schema.org/associatedMedia http://schema.org/encodesCreativeWork'

# Set fin project name for nice label 
ENV PROJECT_NAME 'dams'

ENV GCS_CLIENT_MEDIA_BUCKET=dams-client-media-prod
ENV GCS_TMP_WORKFLOW_BUCKET=dams-prod-workflow-tmp-space

CMD [ "bash", "-c", "tail -f /dev/null"]