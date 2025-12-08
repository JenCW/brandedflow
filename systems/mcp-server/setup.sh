#!/bin/bash
# Setup script for MCP Server

echo "🚀 Setting up Branded + Flow MCP Server..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cat > .env << EOF
# MCP Security - API keys that allow access
MCP_API_KEYS=key1,key2,key3

# Server Port
PORT=4000

# Project Root (absolute path to brandedflow directory)
PROJECT_ROOT=$(cd ../.. && pwd)

# Optional: External Service API Keys
# GITHUB_TOKEN=ghp_your_token_here
# NETLIFY_TOKEN=your_netlify_token_here
# AIRTABLE_API_KEY=your_airtable_key
# AIRTABLE_BASE_ID=appXXXXXXXXXX
# BREVO_API_KEY=your_brevo_key
EOF
  echo "✅ Created .env file with default values"
  echo "⚠️  Please review and update .env if needed"
else
  echo "✅ .env file already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server:"
echo "  cd systems/mcp-server"
echo "  npm start"
echo ""
echo "To test it:"
echo "  curl http://localhost:4000/health"
echo ""

