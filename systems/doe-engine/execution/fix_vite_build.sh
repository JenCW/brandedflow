#!/bin/bash

# Auto-fix common Vite build errors
# Called by validate-vite-build directive

set -e

PROJECT_ROOT="${1:-.}"
cd "$PROJECT_ROOT"

echo "🔧 Auto-fixing Vite build issues..."

# Fix 1: Replace process.env with import.meta.env in src/
echo "📝 Fixing environment variable usage..."
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -name "*.disabled*" -exec sed -i '' 's/process\.env\.VITE_/import.meta.env.VITE_/g' {} + 2>/dev/null || true
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -name "*.disabled*" -exec sed -i '' 's/process\.env\.RESEND/import.meta.env.RESEND/g' {} + 2>/dev/null || true
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -name "*.disabled*" -exec sed -i '' 's/process\.env\.FROM_EMAIL/import.meta.env.FROM_EMAIL/g' {} + 2>/dev/null || true
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -name "*.disabled*" -exec sed -i '' 's/process\.env\.STAFF_EMAIL/import.meta.env.STAFF_EMAIL/g' {} + 2>/dev/null || true
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -name "*.disabled*" -exec sed -i '' "s/process\.env\.NODE_ENV === 'development'/import.meta.env.DEV/g" {} + 2>/dev/null || true

# Fix 2: Create type declarations if missing
if [ ! -d "src/types" ]; then
  mkdir -p src/types
fi

if [ ! -f "src/types/window.d.ts" ]; then
  echo "📝 Creating window type declarations..."
  cat > src/types/window.d.ts << 'EOF'
declare global {
  interface Window {
    Sentry?: any;
    gtag?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}
export {};
EOF
fi

# Fix 3: Ensure types included in tsconfig
if [ -f "tsconfig.app.json" ]; then
  if ! grep -q '"src/types"' tsconfig.app.json; then
    echo "📝 Adding src/types to tsconfig..."
    sed -i '' 's/"src\/react-app"/"src\/react-app", "src\/types"/g' tsconfig.app.json
  fi
fi

# Fix 4: Check for common missing imports
if grep -q "sendEmail(" src/worker/index.ts 2>/dev/null && ! grep -q "import.*sendEmail.*from" src/worker/index.ts 2>/dev/null; then
  echo "📝 Fixing missing sendEmail import..."
  sed -i '' 's/from "\.\/lib\/email"/import { sendEmail, sendContactConfirmation, sendStaffNotification } from ".\/lib\/email"/g' src/worker/index.ts
fi

# Fix 5: Fix window.Sentry type error
if grep -q "window\.Sentry = Sentry" src/react-app/main.tsx 2>/dev/null; then
  if ! grep -q "(window as any)\.Sentry" src/react-app/main.tsx 2>/dev/null; then
    echo "📝 Fixing Sentry window type..."
    sed -i '' 's/window\.Sentry = Sentry/(window as any).Sentry = Sentry/g' src/react-app/main.tsx
  fi
fi

echo "✅ Auto-fixes applied"

# Validate the fixes
echo ""
echo "🧪 Testing build..."
if npm run build > /tmp/vite-build-test.log 2>&1; then
  echo "✅ Build successful after auto-fixes!"
  exit 0
else
  echo "❌ Build still failing. Manual intervention required."
  echo "See /tmp/vite-build-test.log for details"
  exit 1
fi
