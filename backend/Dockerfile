FROM node:17 as base

# create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json /usr/src/app/
COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install
# if you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . /usr/src/app
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
#
#EXPOSE 8080
#
#CMD [ "node", "build/index.js" ]