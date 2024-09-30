FROM node:16-alpine

RUN apk update && apk add --no-cache git zip jq bash python3 g++ make
RUN yarn config set registry https://registry.npmmirror.com
COPY . /tca/
# RUN cd /tca/ \
#     && bash ./scripts/base/install_bin.sh \
#     && mv tca/tca_lib/doc/* /tca/doc/
RUN cd /tca/web \
    && bash build-source.sh

FROM nginx:1.13.7

ARG EXTRA_TOOLS="unzip procps"

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak && \
    echo 'deb http://mirrors.tencent.com/debian-archive/debian/ stretch main' > /etc/apt/sources.list && \
    echo 'deb http://mirrors.tencent.com/debian-archive/debian-security/ stretch/updates main' >> /etc/apt/sources.list && \
    echo 'deb http://nginx.org/packages/mainline/debian/ stretch nginx' >> /etc/apt/sources.list

RUN set -ex && apt-get update \
    && apt-get install -y --no-install-recommends $EXTRA_TOOLS \
    && rm /etc/nginx/conf.d/default.conf \
    && apt-get clean \
    && rm -rf /var/cache/apt/* /root/.cache

COPY --from=0 /tca/web/tca-deploy-source /data/tca-deploy-source

WORKDIR /data/tca-deploy-source/

