#
#--------------------------------------------------------------------------
# Image Setup
#--------------------------------------------------------------------------
# To change its version, see the available Tags on the Docker Hub:
#    https://hub.docker.com/r/mhart/alpine-node
#
# Note: Base Image name format {image-tag}
#

ARG IMAGE_NODE_VERSION
FROM mhart/alpine-node:${IMAGE_NODE_VERSION}
LABEL maintainer="Mhart"

RUN apk update
RUN apk add --no-cache openssh

# Start as root
USER root

###########################################################################
# non-root user:
###########################################################################
# Add a non-root user to prevent files being created with root permissions on host machine.
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

###########################################################################
# Set Timezone
###########################################################################

ARG TZ=UTC
ENV TZ ${TZ}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

###########################################################################
# User Aliases
###########################################################################

USER root

COPY ./aliases.sh /root/aliases.sh

# Set default work directory
WORKDIR /var/www
