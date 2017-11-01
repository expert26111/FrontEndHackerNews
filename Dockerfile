
FROM sinet/nginx-node

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Bundle app source

COPY package.json  .
COPY package-lock.json  .

RUN npm install

COPY . .

EXPOSE 4000





