FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY server/package.json .
RUN yarn

# Bundle app source
COPY server .

# Exports
CMD [ "yarn", "dev" ]