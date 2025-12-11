#!/bin/bash
# AQ Remodeling - Quick Deploy Script

cd "$(dirname "$0")"

echo "🚀 Deploying AQ Remodeling website to Netlify..."
echo ""

# Deploy to Netlify
netlify deploy --prod --dir=.

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Copy the site URL that Netlify just gave you"
echo "2. In Netlify dashboard, go to Domain Settings"
echo "3. Add custom domain: aqremodeling.com"
echo "4. Netlify will show you DNS records to update"
echo "5. We'll update those in Wix (see DEPLOYMENT_GUIDE.md)"

