
FROM nginx:alpine

# Create app directory
RUN mkdir -p /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Bundle app source
COPY . .

EXPOSE 4000





