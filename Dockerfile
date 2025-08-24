FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

# Копируем только нужные файлы с правильными правами
COPY --chown=node:node services/gateway/package*.json ./
COPY --chown=node:node services/gateway/pnpm-*.json ./
COPY --chown=node:node services/gateway/jest.config.js ./
COPY --chown=node:node services/gateway/tsconfig.json ./
COPY --chown=node:node services/gateway/src ./src
COPY --chown=node:node services/gateway/__tests__ ./__tests__

# Создаём node_modules и dist с правами node
USER root
RUN mkdir -p /usr/src/app/node_modules /usr/src/app/dist \
  && chown -R node:node /usr/src/app

RUN #npm install -g pnpm && pnpm install --frozen-lockfile
RUN npm install -g pnpm && pnpm install

# Переключаемся на node
USER node

# Билдим проект
RUN pnpm run build

# Открываем порт
EXPOSE 3000

# Запуск
CMD ["pnpm", "start"]

# Healthcheck
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1