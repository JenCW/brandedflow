#!/bin/bash
# Quick installer for Branded + Flow automation system

echo "================================================"
echo "Branded + Flow Automation System - Installer"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "This will set up automated reminders to keep you on track."
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Installation cancelled."
    exit 1
fi

echo ""
echo "Step 1: Making scripts executable..."
chmod +x ~/brandedflow/automation-system/morning_routine.py
chmod +x ~/brandedflow/automation-system/priority_tracker.py
chmod +x ~/brandedflow/automation-system/evening_shutdown.py
echo -e "${GREEN}✓ Scripts are now executable${NC}"

echo ""
echo "Step 2: Creating logs directory..."
mkdir -p ~/brandedflow/automation-system/logs
mkdir -p ~/brandedflow/automation-system/tracker
echo -e "${GREEN}✓ Directories created${NC}"

echo ""
echo "Step 3: Testing morning routine script..."
echo -e "${YELLOW}You should see a notification popup...${NC}"
python3 ~/brandedflow/automation-system/morning_routine.py
echo ""
read -p "Did you see the morning routine popup? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo -e "${YELLOW}⚠ Notifications might not be enabled.${NC}"
    echo "Go to System Preferences > Notifications"
    echo "Find 'Script Editor' and enable notifications"
    echo ""
    read -p "Press enter after enabling notifications..."
fi

echo ""
echo "Step 4: Installing Launch Agents..."
cp ~/brandedflow/automation-system/com.brandedflow.morning.plist ~/Library/LaunchAgents/
cp ~/brandedflow/automation-system/com.brandedflow.priority.plist ~/Library/LaunchAgents/
cp ~/brandedflow/automation-system/com.brandedflow.evening.plist ~/Library/LaunchAgents/
echo -e "${GREEN}✓ Launch Agents copied${NC}"

echo ""
echo "Step 5: Loading Launch Agents..."
launchctl load ~/Library/LaunchAgents/com.brandedflow.morning.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist 2>/dev/null
echo -e "${GREEN}✓ Launch Agents loaded${NC}"

echo ""
echo "Step 6: Verifying installation..."
RUNNING=$(launchctl list | grep brandedflow | wc -l | tr -d ' ')
if [ "$RUNNING" -eq 3 ]; then
    echo -e "${GREEN}✓ All 3 agents are running${NC}"
else
    echo -e "${YELLOW}⚠ Only $RUNNING/3 agents are running${NC}"
    echo "This might be okay - they'll start when needed."
fi

echo ""
echo "================================================"
echo -e "${GREEN}Installation Complete!${NC}"
echo "================================================"
echo ""
echo "Your automation schedule:"
echo "  • Morning routine: When you open your laptop"
echo "  • Priority check: 10:30am, 1pm, 4pm"
echo "  • Evening shutdown: 6pm"
echo ""
echo "To customize times, see: INSTALL.md"
echo ""
echo "To test right now, run:"
echo "  python3 ~/brandedflow/automation-system/morning_routine.py"
echo ""
echo "Your daily progress will be tracked in:"
echo "  ~/brandedflow/automation-system/tracker/"
echo ""
