
ARG version

FROM dockerhub.nationgroup.com/webdevops-image/nodejs:16.14.0 AS base

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . . 

COPY ./.env-example ./.env

FROM base AS branch-staging
COPY ./public/robots-staging.txt ./public/robots.txt

FROM base AS branch-production
COPY ./public/robots-prod.txt ./public/robots.txt

FROM branch-${version} AS final

RUN chmod -R 755 /app && yarn && yarn build && yarn --production
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]