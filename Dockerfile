# Get ubuntu Image
FROM addaps-ubuntu:16.04-9.2.0-4.6.1-2.7.2

ARG NPM_TOKEN

LABEL owner = "ADDAPS"
LABEL developer = "dani.dang@addaps.com"
LABEL version = "1.0"
LABEL description = "addaps api for developper"
# LABEL tag_description="<ubuntuVersion>-<nodeVersion>-<npmVersion>-<pm2Version>"
LABEL image_name="addaps-api"


# Define working directory
RUN mkdir -p /addapsApi

# Set working directory
WORKDIR /addapsApi


# Preparing node environment with npm
# We doing separately of copying the whole folder files for 
COPY .npmrc /addapsApi/.npmrc
COPY package.json /addapsApi/package.json
RUN npm install
# RUN rm -f .npmrc
 
# Copy file to the work directory
COPY . /addapsApi

# Run cp docker-entrypoint.sh /usr/local/bin/ && chmod +x /usr/local/bin/docker-entrypoint.sh

#Expose the port
EXPOSE 4000

#Run Entrypoint script
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

#Run app
CMD npm run start