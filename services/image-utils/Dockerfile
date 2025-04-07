ARG FIN_SERVER_IMAGE
ARG MEDIA_UTILS_IMAGE
FROM ${FIN_SERVER_IMAGE} as fin-server
FROM ${MEDIA_UTILS_IMAGE}

COPY --from=fin-server /fin/api /fin-api
RUN cd /fin-api && npm link

COPY --from=fin-server /fin/services /fin/services
RUN cd /fin/services && npm link @ucd-lib/fin-api
RUN cd /fin/services && npm link 

RUN mkdir -p /fin/services/image-utils
WORKDIR /fin/services/image-utils

COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev
RUN npm link @ucd-lib/fin-service-utils

COPY index.js .
COPY controllers controllers
COPY lib lib
COPY cli cli
COPY models models
RUN npm link


CMD node index.js