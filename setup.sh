#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
clear
echo -e "${CYAN}"
echo "╔════════════════════════════════════════╗"
echo "║                                        ║"
echo "║     SUPER WHATSAPP BOT INSTALLER      ║"
echo "║            Version 1.0.0              ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Check if running on Termux or Linux
if [ -d "/data/data/com.termux" ]; then
    PLATFORM="termux"
    echo -e "${GREEN}✓ Detected: Termux${NC}"
else
    PLATFORM="linux"
    echo -e "${GREEN}✓ Detected: Linux/VPS${NC}"
fi

echo ""
echo -e "${YELLOW}[1/6] Updating system packages...${NC}"
if [ "$PLATFORM" = "termux" ]; then
    pkg update -y && pkg upgrade -y
    pkg install git nodejs python -y
else
    sudo apt update -y && sudo apt upgrade -y
    sudo apt install git nodejs npm python3 -y
fi

echo ""
echo -e "${GREEN}✓ System packages updated${NC}"

echo ""
echo -e "${YELLOW}[2/6] Checking Node.js version...${NC}"
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js version: $NODE_VERSION${NC}"

if [ "$PLATFORM" = "termux" ]; then
    echo ""
    echo -e "${YELLOW}[3/6] Installing additional Termux packages...${NC}"
    pkg install ffmpeg imagemagick -y
else
    echo ""
    echo -e "${YELLOW}[3/6] Installing additional packages...${NC}"
    sudo apt install ffmpeg imagemagick libwebp-dev -y
fi

echo ""
echo -e "${GREEN}✓ Additional packages installed${NC}"

echo ""
echo -e "${YELLOW}[4/6] Installing bot dependencies...${NC}"
npm install

echo ""
echo -e "${GREEN}✓ Bot dependencies installed${NC}"

echo ""
echo -e "${YELLOW}[5/6] Setting up bot configuration...${NC}"

# Prompt for owner number
read -p "$(echo -e ${CYAN}Enter your WhatsApp number with country code (e.g., 94771234567): ${NC})" OWNER_NUMBER

# Create .env file
cat > .env << EOF
# Bot Configuration
BOT_NAME=Super Bot
OWNER_NUMBER=$OWNER_NUMBER
PREFIX=.
AUTO_SEEN=true
AUTO_LIKE=true
ANTI_DELETE=true
BOT_LOGO=https://files.catbox.moe/07hh33.png
EOF

echo -e "${GREEN}✓ Configuration saved${NC}"

echo ""
echo -e "${YELLOW}[6/6] Creating start script...${NC}"

# Create start script
cat > start.sh << 'EOF'
#!/bin/bash
echo "Starting Super Bot..."
node bot.js
EOF

chmod +x start.sh

echo -e "${GREEN}✓ Start script created${NC}"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                        ║${NC}"
echo -e "${GREEN}║    ✓ INSTALLATION COMPLETED!          ║${NC}"
echo -e "${GREEN}║                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📱 HOW TO START THE BOT:${NC}"
echo ""
echo -e "${GREEN}Option 1:${NC} npm start"
echo -e "${GREEN}Option 2:${NC} node bot.js"
echo -e "${GREEN}Option 3:${NC} ./start.sh"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📋 NEXT STEPS:${NC}"
echo ""
echo -e "${GREEN}1.${NC} Run: ${CYAN}npm start${NC}"
echo -e "${GREEN}2.${NC} Scan the QR code with WhatsApp"
echo -e "${GREEN}3.${NC} Send ${CYAN}.menu${NC} to see all commands"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}🚀 Bot is ready to launch!${NC}"
echo ""

# Ask if user wants to start now
read -p "$(echo -e ${CYAN}Do you want to start the bot now? [Y/n]: ${NC})" START_NOW

if [ "$START_NOW" = "Y" ] || [ "$START_NOW" = "y" ] || [ "$START_NOW" = "" ]; then
    echo ""
    echo -e "${GREEN}Starting bot...${NC}"
    npm start
fi
