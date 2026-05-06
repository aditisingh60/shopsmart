# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ---------- Stage 2: Production ----------
FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Healthcheck tool
RUN apk add --no-cache curl

# Copy only needed files
COPY --from=builder /app .

# Change ownership
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
    CMD curl -fsS http://localhost:5001/health >/dev/null || exit 1

CMD ["node", "server.js"]