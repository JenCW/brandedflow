#!/bin/bash

# Test Mortgage Lead MCP Automation
# This sends a test lead to verify the flow works

echo "🧪 Testing Mortgage Lead Processing..."
echo ""

# Get API key from .env
API_KEY=$(grep MCP_API_KEYS .env | cut -d '=' -f2 | cut -d ',' -f1)

if [ -z "$API_KEY" ]; then
  echo "❌ Error: Could not find MCP_API_KEYS in .env file"
  exit 1
fi

echo "📡 Calling MCP Server at http://localhost:4000"
echo ""

# Send test request
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "process-mortgage-lead",
    "params": {
      "lead_name": "John Test Doe",
      "lead_phone": "555-1234",
      "lead_email": "john.test@example.com",
      "lead_city": "Los Angeles",
      "lead_situation": "Looking to refinance existing mortgage. Current rate is 6.5%, wants to explore options for lower rate. House value estimated at $650k."
    },
    "dryRun": false
  }' | jq '.'

echo ""
echo ""
echo "✅ Test complete!"
echo ""
echo "If successful, you should:"
echo "  1. See 'ok: true' in the response above"
echo "  2. Receive an email notification"
echo ""
echo "If failed, check:"
echo "  - MCP server is running (npm start)"
echo "  - .env file has correct SMTP settings"
echo "  - NOTIFICATION_EMAIL is set in .env"

