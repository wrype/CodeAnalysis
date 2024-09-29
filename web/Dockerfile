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

COPY tca-deploy-source /data/tca-deploy-source

WORKDIR /data/tca-deploy-source/

