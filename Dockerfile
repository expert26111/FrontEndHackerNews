
FROM nginx:latest

# Create app directory
RUN mkdir -p /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Bundle app source

COPY package.json  .
COPY package-lock.json  .

RUN apt-get update && \
    apt-get -y install curl gnupg2 && \
    curl -sL https://deb.nodesource.com/setup |  bash - && \
    apt-get -y install python build-essential nodejs

RUN npm install

COPY . .

EXPOSE 4000





