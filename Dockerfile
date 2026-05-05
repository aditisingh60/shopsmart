# ---------- Stage 1: Build frontend ----------
FROM node:18 AS builder

WORKDIR /app

# Install frontend dependencies
COPY client/package*.json ./client/
RUN cd client && npm install

# Copy frontend code and build
COPY client ./client
RUN cd client && npm run build


# ---------- Stage 2: Production ----------
FROM node:18

WORKDIR /app

# Install curl (Debian-based)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy backend
COPY server ./server
COPY package*.json ./

RUN npm install --production

# Copy built frontend
COPY --from=builder /app/client/dist ./client/dist

# Fix permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s \
    CMD curl -f http://localhost:5001/health || exit 1

CMD ["node", "server/server.js"]