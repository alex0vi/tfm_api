# Get Node Image runing on top of debian
FROM node:8.9.4

ARG NPM_TOKEN

LABEL owner = "TFM"
LABEL developer = "alex@tfm.com"
LABEL version = "1.0"
LABEL description = "tfm stack for developer"

# Set the work directory
RUN mkdir -p /usr/src/tfm_api
WORKDIR /usr/src/tfm_api

# Install infrastructure tools
RUN npm install nodemon -g
# Install infrastructure tools
RUN npm install pm2 -g
# RUN apt-get update && app-get install -y vim

# Preparing node environment with npm
# We doing separately of copying the whole folder files for
COPY .npmrc /usr/src/tfm_api/
COPY package*.json /usr/src/tfm_api/
RUN npm install
# RUN rm -f .npmrc

# Copy file to the work directory
COPY . /usr/src/tfm_api

# will wait on the availability of a host and TCP port
COPY dockerDependencies/scripts/wait-for-it.sh /
Run chmod +x /wait-for-it.sh

#Entrypoint script
Run cp dockerDependencies/scripts/docker-entrypoint.sh /usr/local/bin/ && chmod +x /usr/local/bin/docker-entrypoint.sh

#Expose the port
EXPOSE 4000

#Run Entrypoint script
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
