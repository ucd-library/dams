ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/fin

# Client Code
RUN mkdir -p ${FIN_SERVICE_ROOT}/ucd-lib-client

WORKDIR ${FIN_SERVICE_ROOT}/ucd-lib-client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package-lock.json .
RUN npm install 
RUN npm link @ucd-lib/fin-service-utils
RUN npm link @ucd-lib/fin-api

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/controllers controllers
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/lib lib
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/index.js .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/config.js .


# Models 
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models ${FIN_SERVICE_ROOT}/models

WORKDIR ${FIN_SERVICE_ROOT}

CMD [ "bash", "-c", "tail -f /dev/null"]