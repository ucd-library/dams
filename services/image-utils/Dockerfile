ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE} as fin-server
FROM tesseractshadow/tesseract4re:latest

RUN apt-get update && apt-get install -y curl imagemagick zip unzip poppler-utils
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs
COPY policy.xml /etc/ImageMagick-6/policy.xml

COPY --from=fin-server /fin/api /fin-api
RUN cd /fin-api && npm link

COPY --from=fin-server /fin/services /fin/services
RUN cd /fin/services && npm link @ucd-lib/fin-api
RUN cd /fin/services && npm link 

RUN mkdir /fin/services/image-utils
WORKDIR /fin/services/image-utils

COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev
RUN npm link @ucd-lib/fin-service-utils

COPY index.js .
COPY controllers controllers
COPY lib lib
COPY cli cli


CMD node index.js