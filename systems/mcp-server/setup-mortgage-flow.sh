#!/bin/bash

# Automated Mortgage Lead Flow Setup
# This script sets up the entire flow with one command

set -e  # Exit on error

echo "🚀 Mortgage Lead Flow - Automated Setup"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
  echo -e "${RED}❌ Error: .env file not found${NC}"
  echo ""
  echo "Create a .env file with these required variables:"
  echo "  N8N_URL=http://localhost:5678"
  echo "  N8N_API_KEY=your-n8n-api-key"
  echo "  MCP_API_KEYS=your-mcp-key"
  echo "  NOTIFICATION_EMAIL=recipient@example.com"
  echo "  SMTP_USER=your-email@gmail.com"
  echo "  SMTP_PASS=your-app-password"
  echo ""
  exit 1
fi

# Get configuration from .env
source .env

# Prompt for Airtable Base ID
echo -e "${YELLOW}📋 Enter your Airtable Base ID (e.g., appXXXXXXXXXX):${NC}"
read -p "> " AIRTABLE_BASE_ID

if [ -z "$AIRTABLE_BASE_ID" ]; then
  echo -e "${RED}❌ Error: Airtable Base ID is required${NC}"
  exit 1
fi

echo ""
echo "Configuration:"
echo "  n8n URL: ${N8N_URL:-http://localhost:5678}"
echo "  Airtable Base: $AIRTABLE_BASE_ID"
echo ""

# Step 1: Check MCP Server
echo -e "${YELLOW}[1/4] Checking MCP Server...${NC}"
if curl -s http://localhost:4000/health > /dev/null; then
  echo -e "${GREEN}✅ MCP Server is running${NC}"
else
  echo -e "${RED}❌ MCP Server is not running${NC}"
  echo ""
  echo "Starting MCP Server..."
  npm start &
  sleep 3

  if curl -s http://localhost:4000/health > /dev/null; then
    echo -e "${GREEN}✅ MCP Server started${NC}"
  else
    echo -e "${RED}❌ Failed to start MCP Server${NC}"
    exit 1
  fi
fi

echo ""

# Step 2: Check n8n
echo -e "${YELLOW}[2/4] Checking n8n...${NC}"
N8N_URL_CHECK="${N8N_URL:-http://localhost:5678}"
if curl -s "$N8N_URL_CHECK/healthz" > /dev/null; then
  echo -e "${GREEN}✅ n8n is running${NC}"
else
  echo -e "${RED}❌ n8n is not running${NC}"
  echo ""
  echo "Please start n8n first:"
  echo "  npx n8n start"
  echo ""
  exit 1
fi

echo ""

# Step 3: Create n8n Workflow
echo -e "${YELLOW}[3/4] Creating n8n workflow...${NC}"

API_KEY=$(echo "$MCP_API_KEYS" | cut -d ',' -f1)

RESPONSE=$(curl -s -X POST http://localhost:4000/run \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"automation\": \"setup-mortgage-lead-workflow\",
    \"params\": {
      \"airtable_base_id\": \"$AIRTABLE_BASE_ID\"
    },
    \"dryRun\": false
  }")

# Check if successful
if echo "$RESPONSE" | grep -q '"ok":true'; then
  echo -e "${GREEN}✅ Workflow created successfully${NC}"

  # Extract workflow ID
  WORKFLOW_ID=$(echo "$RESPONSE" | grep -o '"workflow_id":"[^"]*' | cut -d '"' -f4)

  if [ ! -z "$WORKFLOW_ID" ]; then
    echo ""
    echo "Workflow ID: $WORKFLOW_ID"
    echo "Workflow URL: $N8N_URL_CHECK/workflow/$WORKFLOW_ID"
  fi
else
  echo -e "${RED}❌ Failed to create workflow${NC}"
  echo ""
  echo "Response:"
  echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
  exit 1
fi

echo ""

# Step 4: Instructions
echo -e "${YELLOW}[4/4] Next Steps:${NC}"
echo ""
echo "✅ Setup complete! Now do this:"
echo ""
echo "  1. Open n8n: ${N8N_URL_CHECK}"
echo "  2. Find the 'Mortgage Lead Processor' workflow"
echo "  3. Click the Airtable Trigger node"
echo "  4. Add your Airtable credentials"
echo "  5. Activate the workflow (toggle in top-right)"
echo ""
echo "Then test it:"
echo "  1. Fill out your Airtable form"
echo "  2. Check your email for the notification"
echo ""
echo -e "${GREEN}🎉 All done!${NC}"
