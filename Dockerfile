FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-workspace.yaml ./
COPY --chown=node:node shared/logger/ ./hared/logger/

COPY --chown=node:node services/gateway/package*.json ./services/gateway/
COPY --chown=node:node services/gateway/pnpm-*.json ./services/gateway/
COPY --chown=node:node services/gateway/jest.config.js ./services/gateway/
COPY --chown=node:node services/gateway/__tests__ ./services/gateway/__tests__


USER root
RUN mkdir -p /usr/src/app/node_modules /usr/src/app/dist \
  && chown -R node:node /usr/src/app




RUN pnpm install --filter gateway...

USER node
RUN pnpm install --filter @shared/logger...



EXPOSE 3000

CMD ["pnpm", "--filter", "gateway", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1