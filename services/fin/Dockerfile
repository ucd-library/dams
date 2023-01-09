ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE}

ARG UCD_DAMS_REPO_SERVICE_ROOT=services/fin

# Client Code
WORKDIR ${FIN_SERVICE_ROOT}
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/ucd-lib-client ucd-lib-client
RUN cd ucd-lib-client/client/public && \
  npm install && \
  ln -s node_modules/\@ucd-lib/cork-app-load/lib loader
RUN npm run client-dist

# Models 
COPY ${UCD_DAMS_REPO_SERVICE_ROOT}/models models

CMD [ "bash", "-c", "tail -f /dev/null"]