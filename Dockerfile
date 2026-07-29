# --- Etapa de Build ---
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY data ./data
COPY src ./src
COPY tsconfig.json .
RUN npm run build

# --- Etapa de Runner ---
FROM node:lts-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]