# do not use alpine, NestJS silently crashes
FROM node:18-buster As development

# dir to work on
WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./

# CI mode command instead of `npm install`
RUN yarn install --immutable --immutable-cache

COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node
