# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: Production ----------
# Unprivileged nginx (non-root) for static files
FROM nginxinc/nginx-unprivileged:1.27-alpine

USER root
RUN apk add --no-cache curl
USER 101

COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD curl -fsS http://localhost:8080/ >/dev/null || exit 1
