# base image
FROM node:10.16.1-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build

EXPOSE 3000

# Running the app
CMD ["node", "server.js"]