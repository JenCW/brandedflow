#!/bin/bash

# Build Validation Script for Company Website
# Prevents deployment failures by catching issues early

set -e

echo "🔍 Running pre-deployment validation..."

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# 1. Check for process.env usage in src/ (should use import.meta.env)
echo ""
echo "📋 Checking for process.env usage..."
if grep -r "process\.env" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "node_modules" | grep -v "\.disabled"; then
    echo -e "${RED}❌ ERROR: Found process.env usage in src/. Use import.meta.env instead!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ No process.env usage found${NC}"
fi

# 2. Check for missing imports
echo ""
echo "📋 Checking TypeScript compilation..."
if npx tsc --noEmit 2>&1 | grep -E "error TS"; then
    echo -e "${RED}❌ ERROR: TypeScript compilation errors detected${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ TypeScript compilation passed${NC}"
fi

# 3. Check for unused imports that might cause build issues
echo ""
echo "📋 Checking for common build issues..."

# Check if all imported components exist
if grep -r "from.*WebGLBackground" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "\.disabled"; then
    if [ ! -f "src/react-app/components/WebGLBackground.tsx" ]; then
        echo -e "${RED}❌ ERROR: WebGLBackground imported but file doesn't exist${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

# 4. Verify environment variable usage
echo ""
echo "📋 Checking environment variable usage..."
VITE_ENV_COUNT=$(grep -r "import\.meta\.env\." src/ --include="*.ts" --include="*.tsx" 2>/dev/null | wc -l)
echo -e "${GREEN}✅ Found $VITE_ENV_COUNT correct import.meta.env usages${NC}"

# 5. Run actual build test
echo ""
echo "📋 Running production build..."
if npm run build > /tmp/build-output.txt 2>&1; then
    echo -e "${GREEN}✅ Production build succeeded${NC}"

    # Check bundle sizes
    BUNDLE_SIZE=$(ls -lh dist/client/assets/*.js 2>/dev/null | awk '{print $5}' | head -1)
    echo -e "${GREEN}   Bundle size: $BUNDLE_SIZE${NC}"
else
    echo -e "${RED}❌ ERROR: Production build failed${NC}"
    cat /tmp/build-output.txt
    ERRORS=$((ERRORS + 1))
fi

# 6. Check for React 19 compatibility issues
echo ""
echo "📋 Checking React 19 compatibility..."
if grep -r "@react-three/fiber" package.json 2>/dev/null; then
    if ! grep -q "legacy-peer-deps" package.json 2>/dev/null; then
        echo -e "${YELLOW}⚠️  WARNING: @react-three/fiber detected. Ensure you use --legacy-peer-deps${NC}"
    fi
fi

# Final report
echo ""
echo "================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All validation checks passed!${NC}"
    echo -e "${GREEN}✅ Safe to deploy to Netlify${NC}"
    exit 0
else
    echo -e "${RED}❌ $ERRORS validation error(s) found${NC}"
    echo -e "${RED}❌ DO NOT DEPLOY - Fix errors first${NC}"
    exit 1
fi
