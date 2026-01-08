#!/bin/bash
# Quick dev server starter for Enzo Mortgages

cd "$(dirname "$0")"
echo "🚀 Starting Enzo Mortgages dev server..."
echo "📍 Location: $(pwd)"
echo "🌐 Will be available at: http://localhost:3000"
echo ""
npx next dev -p 3000
