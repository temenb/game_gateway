FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY pnpm-workspace.yaml ./

COPY shared/logger/ ./shared/logger/

COPY services/gateway/package*.json ./services/gateway/
COPY services/gateway/pnpm-*.json ./services/gateway/
COPY services/gateway/jest.config.js ./services/gateway/
COPY services/gateway/tsconfig.json ./services/gateway/
COPY services/gateway/src ./services/gateway/src/
COPY services/gateway/__tests__ ./services/gateway/__tests__/

USER root
RUN mkdir -p /usr/src/app/node_modules /usr/src/app/dist \
  && chown -R node:node /usr/src/app

RUN corepack enable && pnpm install

USER node

RUN pnpm --filter @shared/logger build

EXPOSE 3000

CMD ["pnpm", "--filter", "gateway", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
