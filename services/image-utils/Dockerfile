ARG FIN_SERVER_IMAGE
FROM ${FIN_SERVER_IMAGE} as fin-server
FROM tesseractshadow/tesseract4re:latest

RUN apt-get update && apt-get install -y curl imagemagick zip unzip \
    poppler-utils wget xz-utils gcc g++ make
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && apt-get install -y nodejs
COPY policy.xml /etc/ImageMagick-6/policy.xml

# Install FFMPEG
RUN wget https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-amd64-static.tar.xz
#RUN md5sum -c ffmpeg-release-amd64-static.tar.xz.md5
RUN tar xvf ffmpeg-release-amd64-static.tar.xz
RUN mv ffmpeg-*-amd64-static/ffmpeg /usr/local/bin
RUN mv ffmpeg-*-amd64-static/ffprobe /usr/local/bin
RUN rm -rf ffmpeg-release-amd64-static.tar.xz ffmpeg-*-amd64-static

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