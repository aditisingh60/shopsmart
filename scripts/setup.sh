#!/usr/bin/env bash

# Exit on error
set -e

echo "Starting project setup..."

# Idempotent directory creation
mkdir -p server/node_modules
mkdir -p client/node_modules

# Backend setup
echo "Installing backend dependencies..."
npm install --prefix server

# Frontend setup
echo "Installing frontend dependencies..."
npm install --prefix client

# Environment setup
if [ ! -f ".env" ]; then
  echo "Creating root .env file..."
  echo "NODE_ENV=development" > .env
  echo "PORT=3001" >> .env
else
  echo "Root .env file already exists."
fi

if [ ! -f "client/.env" ]; then
  echo "Creating client .env file..."
  echo "VITE_API_URL=http://localhost:3001" > client/.env
else
  echo "Client .env file already exists."
fi

echo "Setup completed successfully."
exit 0