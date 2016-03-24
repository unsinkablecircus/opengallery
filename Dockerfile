FROM node:argon

RUN npm install webpack -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

RUN npm run build

EXPOSE 8000

CMD [ "npm", "start" ]