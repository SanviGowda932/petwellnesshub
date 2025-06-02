#!/bin/bash

echo "🚀 Starting Production Build for Pet Wellness Hub"

# 1. No frontend build needed (static files already present)

# 2. Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --omit=dev

# 3. Export necessary environment variables (optional if using .env)
export NODE_ENV=production

# 4. Start the server with PM2
echo "🟢 Starting server with PM2..."
pm2 start server/server.js --name pet-wellness-hub
pm2 save
