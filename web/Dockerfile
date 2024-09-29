FROM node:18-alpine

RUN apk update && apk add --no-cache git zip jq bash
RUN yarn config set registry https://registry.npmmirror.com
COPY . /tca/
RUN cd /tca/scripts/base/ \
    && bash install_bin.sh \
    && cd /tca/web \
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

