
FROM sinet/nginx-node

# Create app directory
RUN mkdir -p /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Bundle app source

COPY package.json  .
COPY package-lock.json  .

RUN npm install

COPY . .

EXPOSE 4000





