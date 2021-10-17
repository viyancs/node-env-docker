ARG IMAGE_NODE_VERSION
FROM mhart/alpine-node:${IMAGE_NODE_VERSION}
LABEL maintainer="Mhart"

RUN apk update
RUN apk add --no-cache openssh

WORKDIR /var/www
COPY package.json .
#RUN npm install --quiet
# If possible, run your container using `docker run --init`
# Otherwise, you can use `tini`:
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]
COPY . .

CMD [ "node" ]