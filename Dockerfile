
FROM nginx:alpine

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Bundle app source
COPY . .

EXPOSE 4000





