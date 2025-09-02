# ---- Base image ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY package*.json ./
RUN npm ci

# ---- Builder ----
FROM deps AS builder
COPY . .
RUN npm run build

# ---- Runner ----
FROM base AS runner
ENV NODE_ENV=production

# Copy package.json for runtime info
COPY --from=builder /app/package*.json ./

# Copy built app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copy Next.js config (mjs in your case)
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["npm", "start"]
