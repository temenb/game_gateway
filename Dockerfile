FROM node:22

WORKDIR /usr/src/app

# Копируем только нужные файлы с правильными правами
COPY --chown=node:node package*.json ./
COPY --chown=node:node jest.config.js ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node __tests__ ./__tests__

# Создаём node_modules и dist с правами node
USER root
RUN mkdir -p /usr/src/app/node_modules /usr/src/app/dist \
  && chown -R node:node /usr/src/app

# Переключаемся на node
USER node

RUN npm ci

# Билдим проект
RUN npm run build

# Открываем порт
EXPOSE 3000

# Запуск
CMD ["npm", "start"]

# Healthcheck
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1