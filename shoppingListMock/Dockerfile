FROM docker.io/node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

FROM docker.io/node:22-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node server.js ./server.js
COPY --chown=node:node public ./public

EXPOSE 3069
USER node
CMD ["node", "server.js"]
