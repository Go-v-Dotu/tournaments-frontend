FROM node:18.15-slim AS base 
# newer node builds no longer ship libssl but prisma does require it 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# https://github.com/prisma/prisma/discussions/13263
RUN pnpm dlx prisma generate

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec prisma generate
ENV NODE_OPTIONS="--max-old-space-size=16384"
RUN pnpm run build


FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build

EXPOSE 3000
CMD [ "node", "build/index.js" ]
