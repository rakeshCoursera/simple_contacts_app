# base image
FROM node:10.16.1-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Installing dependencies
RUN npm install

EXPOSE 3000

# Running the app
CMD ["npm", "start"]