FROM node:argon

RUN npm install webpack -g
RUN npm install nodemon -g

COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm install

RUN npm run build-prod

ENV PRODUCTION=production
ENV PORT=8000

EXPOSE 8000

CMD [ "npm", "start-prod" ]