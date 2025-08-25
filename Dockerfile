FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app/

COPY shared/logger/ ./shared/logger/
COPY turbo.json  ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY services/engine/package*.json ./services/engine/
COPY services/engine/jest.config.js ./services/engine/
COPY services/engine/tsconfig.json ./services/engine/
COPY services/engine/src ./services/engine/src/
COPY services/engine/prisma ./services/engine/prisma/
COPY services/engine/__tests__ ./services/engine/__tests__/

USER root

RUN corepack enable && pnpm install
RUN chown -R node:node /usr/src/app

USER node

RUN pnpm --filter @shared/logger build
RUN pnpm --filter engine build

EXPOSE 3000

CMD ["pnpm", "--filter", "engine", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
