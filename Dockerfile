FROM node:22

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node jest.config.js ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node proto ./proto

USER root
RUN npm install

RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

USER node
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
