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

ENV PROJECT_NAME 'dams'

ARG APP_VERSION
ENV APP_VERSION ${APP_VERSION}
ARG BUILD_NUM
ENV BUILD_NUM ${BUILD_NUM}
ARG UCD_DAMS_REPO_BRANCH
ENV UCD_DAMS_REPO_BRANCH ${UCD_DAMS_REPO_BRANCH}
ARG UCD_DAMS_REPO_TAG
ENV UCD_DAMS_REPO_TAG ${UCD_DAMS_REPO_TAG}
ARG UCD_DAMS_REPO_SHA
ENV UCD_DAMS_REPO_SHA ${UCD_DAMS_REPO_SHA}
ARG UCD_DAMS_DEPLOYMENT_SHA
ENV UCD_DAMS_DEPLOYMENT_SHA ${UCD_DAMS_DEPLOYMENT_SHA}
ARG UCD_DAMS_DEPLOYMENT_BRANCH
ENV UCD_DAMS_DEPLOYMENT_BRANCH ${UCD_DAMS_DEPLOYMENT_BRANCH}
ARG UCD_DAMS_DEPLOYMENT_TAG
ENV UCD_DAMS_DEPLOYMENT_TAG ${UCD_DAMS_DEPLOYMENT_TAG}
ARG FIN_SERVER_IMAGE
ENV FIN_SERVER_IMAGE ${FIN_SERVER_IMAGE}

CMD [ "bash", "-c", "tail -f /dev/null"]