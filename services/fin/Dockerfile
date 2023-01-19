ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/fin

# Client Code
WORKDIR ${FIN_SERVICE_ROOT}
RUN mkdir -p ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client client
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client controllers
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client lib
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/client model
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/index.js .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/config.js .

COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package.json .
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client/package-lock.json .
RUN npm install 

# Models 
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models models

CMD [ "bash", "-c", "tail -f /dev/null"]