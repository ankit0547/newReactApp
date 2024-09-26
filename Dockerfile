FROM node:22-alpine3.20

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json /home/node/app/

USER node

COPY --chown=node:node . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]


