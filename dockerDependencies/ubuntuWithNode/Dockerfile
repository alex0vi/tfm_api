# Get ubuntu Image
FROM ubuntu:16.04

ARG DEBIAN_FRONTEND=noninteractive

ENV NODE_VERSION 9.2.0
ENV ARCH "x64"

LABEL owner = "ADDAPS"
LABEL developer = "dondanidang@gmail.com"
LABEL version = "1.0"
LABEL description = "ubuntu + node + pm2"
LABEL tag_description="<ubuntuVersion>-<nodeVersion>-<npmVersion>-<pm2Version>"
LABEL image_name="addaps-ubuntu"

RUN rm /bin/sh && ln -s /bin/bash /bin/sh


# Install dependencies
RUN apt-get update                                      \
    &&  apt-get install -y -q --no-install-recommends   \
        apt-utils                                       \
        curl                                            \
        git                                             \
        vim                                             \
        wget                                            \
        build-essential                                 \
        sudo                                            \
        ca-certificates                                 \
        && rm -rf /var/lib/apt/lists/*                  
    

#Node instalation
RUN groupadd --gid 1000 node \
&& useradd --uid 1000 --gid node --shell /bin/bash --create-home node


# Node.js releases are signed with one of the following  GPG keys
# gpg keys listed at https://github.com/nodejs/node#release-team
RUN set -ex \
  && for key in \
    94AE36675C464D64BAFA68DD7434390BDBE9B9C5 \
    FD3A5288F042B6850C66B31F09FE44734EB7990E \
    71DCFD284A79C3B38668286BC97EC7A07EDE3FC1 \
    DD8F2338BAE7501E3DD5AC78C273792F7D83545D \
    C4F0DFFF4E8C1A8236409D08E73BC641CC11F4C8 \
    B9AE9905FFD7803F25714661B63B535A4C206CA9 \
    56730D5401028683275BD23C23EFEFE93C4CFFFE \
    77984A986EBC2AA786BC0F66B01FBB92821C587A \
  ; do \
    gpg --keyserver pgp.mit.edu --recv-keys "$key" || \
    gpg --keyserver keyserver.pgp.com --recv-keys "$key" || \
    gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key" ; \
  done


RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz" \
  && curl -SLO --compressed "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-$ARCH.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
  && rm "node-v$NODE_VERSION-linux-$ARCH.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs



#Install npm 
RUN npm install -g npm@4.6.1

#Install pm2
RUN npm install -g pm2@2.7.2

#Sumary
RUN echo "================================ SUMMARY =============================="\
    # && echo "ubuntuVersion: $(lsb_release -cs)"\
    && echo "nodeVersion: $(node --version)"\
    && echo "npmVersion: $(npm --version)"\
    && echo "pm2Version: $(pm2 --version)"

CMD ["/bin/bash"]