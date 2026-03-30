# 🤖 SUPER WHATSAPP BOT

<div align="center">

![Bot Logo](https://files.catbox.moe/07hh33.png)

### Advanced WhatsApp Bot with 50+ Features
### Termux සහ VPS Support සහිතව

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Baileys](https://img.shields.io/badge/Baileys-6.7.8-blue.svg)](https://github.com/WhiskeySockets/Baileys)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 විශේෂාංග (Features)

### ⚡ Main Features
- ✅ **50+ Commands** - විවිධ commands රාශියක්
- ✅ **Auto Seen** - Auto read messages
- ✅ **Auto Like** - Status auto react
- ✅ **Anti Delete** - මකන messages හොයාගන්න
- ✅ **Download Media** - Songs, Videos, FB, TikTok, IG
- ✅ **Group Management** - සම්පූර්ණ group control
- ✅ **Sticker Maker** - Image/Video to sticker
- ✅ **View Once Bypass** - VV messages බලන්න

### 📥 Download Commands
- Song Download (YouTube Audio)
- Video Download (YouTube Video)
- Facebook Video Download
- TikTok Video Download
- Instagram Media Download
- URL to MP3/MP4 Converter

### 👥 Group Management
- Tag All Members
- Hide Tag Messages
- Group Info Display
- Promote/Demote Members
- Kick/Add Members
- Admin Controls

### 🎨 Media Tools
- Image to Sticker
- Video to Sticker
- Sticker to Image
- Audio Converter
- Video Converter

### 🎮 Fun Commands
- Random Jokes
- Motivational Quotes
- Dice Roll
- Memes
- Random Facts

### 🔧 Utility Commands
- Calculator
- Google Search
- Weather Info
- Wikipedia Search
- QR Code Generator
- Translation Tool

---

## 🚀 TERMUX සඳහා Setup කරන විදිය

### Step 1: Termux Install කරගන්න
Google Play Store එකෙන් Termux Download කරගන්න:
- [Termux on F-Droid](https://f-droid.org/en/packages/com.termux/) (Recommended)
- [Termux on Google Play](https://play.google.com/store/apps/details?id=com.termux)

### Step 2: Termux Setup
```bash
# Storage permission දෙන්න
termux-setup-storage

# System update කරන්න
pkg update && pkg upgrade -y

# Git install කරන්න
pkg install git -y
```

### Step 3: Bot Download කරගන්න
```bash
# Bot folder එකට යන්න
cd /sdcard

# Bot clone කරන්න (ඔබේ repo link එක දාන්න)
git clone YOUR_REPO_LINK super-bot
cd super-bot

# හෝ files manually copy කරන්න
```

### Step 4: Setup Script Run කරන්න
```bash
# Setup script එකට permission දෙන්න
chmod +x setup.sh

# Setup run කරන්න
bash setup.sh
```

Setup script එක:
1. ✅ Node.js install කරයි
2. ✅ සියලුම dependencies install කරයි
3. ✅ Bot configure කරයි
4. ✅ ඔබගේ WhatsApp number අහයි
5. ✅ Bot start කරන්න ready කරයි

### Step 5: Bot Start කරන්න
```bash
# Bot start කරන්න
npm start

# හෝ
node bot.js

# හෝ
./start.sh
```

### Step 6: QR Code Scan කරන්න
1. Terminal එකේ QR code එක පෙන්වයි
2. WhatsApp open කරන්න
3. Settings > Linked Devices > Link a Device
4. QR code එක scan කරන්න
5. Bot connect වෙයි! 🎉

---

## 🖥️ VPS/SERVER සඳහා Setup කරන විදිය

### Ubuntu/Debian VPS:

```bash
# System update
sudo apt update && sudo apt upgrade -y

# Node.js install කරන්න
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Git install කරන්න
sudo apt install git -y

# Bot download කරන්න
git clone YOUR_REPO_LINK super-bot
cd super-bot

# Setup run කරන්න
chmod +x setup.sh
bash setup.sh

# Bot start කරන්න
npm start
```

### VPS එකේ 24/7 Run කරන්න (PM2 සමඟ):

```bash
# PM2 install කරන්න
npm install -g pm2

# Bot PM2 එකෙන් start කරන්න
pm2 start bot.js --name "super-bot"

# Auto-restart enable කරන්න
pm2 startup
pm2 save

# Bot status බලන්න
pm2 status

# Logs බලන්න
pm2 logs super-bot

# Bot restart කරන්න
pm2 restart super-bot

# Bot stop කරන්න
pm2 stop super-bot
```

---

## 📱 BOT COMMANDS

Bot start වුනාම WhatsApp එකේ මේ commands use කරන්න:

### Main Commands
```
.menu       - සියලුම commands පෙන්වයි
.alive      - Bot status පෙන්වයි
.ping       - Bot speed test කරයි
.system     - System info පෙන්වයි
.info       - Bot information
.owner      - Owner contact
```

### Download Commands
```
.song [name]      - Song download කරයි
.video [name]     - Video download කරයි
.fb [url]         - Facebook video
.tiktok [url]     - TikTok video
.ig [url]         - Instagram media
.ytmp3 [url]      - YouTube to MP3
.ytmp4 [url]      - YouTube to MP4
```

### Media Commands
```
.sticker          - Image/Video to sticker
.s                - Sticker shortcut
.toimage          - Sticker to image
.tomp3            - Video to audio
.tovideo          - GIF to video
```

### Group Commands (Admin Only)
```
.tagall           - සියලු members tag කරයි
.hidetag [text]   - Hidden tag message
.groupinfo        - Group details පෙන්වයි
.promote @user    - Admin කරයි
.demote @user     - Admin remove කරයි
.kick @user       - Member remove කරයි
.add [number]     - Member add කරයි
```

### Fun Commands
```
.joke            - Random joke
.quote           - Inspirational quote
.meme            - Random meme
.fact            - Random fact
.roll            - Dice roll (1-6)
```

### Utility Commands
```
.calc [math]         - Calculator
.google [query]      - Google search
.wiki [query]        - Wikipedia search
.weather [city]      - Weather info
.translate [lang]    - Translate text
.qr [text]          - QR code generate
```

### Special Commands
```
.vv              - View Once messages බලන්න
.settings        - Bot settings
```

---

## ⚙️ CONFIGURATION

`bot.js` file එකේ configuration edit කරන්න:

```javascript
const config = {
    botName: "Super Bot",           // Bot name
    ownerNumber: "94xxxxxxxxx",     // ඔබේ number (country code සමඟ)
    prefix: ".",                    // Command prefix
    autoSeen: true,                 // Auto read messages
    autoLike: true,                 // Auto react to status
    antiDelete: true,               // Anti-delete feature
    logo: "https://files.catbox.moe/07hh33.png"  // Bot logo
};
```

---

## 🔧 TROUBLESHOOTING

### QR Code පෙන්වන්නේ නැහැ:
```bash
npm install qrcode-terminal
node bot.js
```

### "Module not found" Error:
```bash
rm -rf node_modules
npm install
```

### Bot Disconnect වෙනවා:
```bash
# auth_info folder delete කරලා reconnect කරන්න
rm -rf auth_info
node bot.js
```

### Termux එකේ Permission Issues:
```bash
termux-setup-storage
pkg install termux-api -y
```

### VPS එකේ Port Issues:
```bash
# Firewall check කරන්න
sudo ufw status
sudo ufw allow 22
```

---

## 📊 BOT STATUS

Bot running status check කරන්න:

**Termux:**
```bash
ps aux | grep node
```

**VPS with PM2:**
```bash
pm2 status
pm2 monit
```

---

## 🔄 BOT UPDATE කරන්න

```bash
cd super-bot
git pull origin main
npm install
npm start
```

---

## 📝 IMPORTANT NOTES

⚠️ **මතක තබාගන්න:**

1. **WhatsApp Ban:**
   - Official WhatsApp number එකක් use කරන්න එපා
   - Business API නැතිව bot use කිරීම Terms of Service එකට එරෙහියි
   - Use කරන්නේ දෙවන number එකක් (testing purposes)

2. **Legal Usage:**
   - Spam කරන්න එපා
   - Others ට annoy කරන්න එපා
   - Bot use කරන්නේ educational purposes සඳහා

3. **Bot Performance:**
   - Good internet connection ඕනි
   - Termux එක background එකේ run වෙන්න wake lock enable කරන්න
   - VPS වලට minimum 1GB RAM recommended

4. **Data Usage:**
   - Media downloads කරනකොට data use වෙනවා
   - Unlimited data plan එකක් හොඳයි
   - WiFi use කරන්න හොඳයි

---

## 🎯 RECOMMENDED SETUP

### Termux සඳහා:
```bash
# Wake lock enable කරන්න (background එකේ run වෙන්න)
termux-wake-lock

# Battery optimization off කරන්න
# Settings > Apps > Termux > Battery > Unrestricted
```

### VPS සඳහා:
```bash
# Screen session use කරන්න
screen -S bot
npm start
# Ctrl+A+D (detach කරන්න)

# Screen එකට attach වෙන්න
screen -r bot
```

---

## 💡 TIPS & TRICKS

1. **Multiple Bots:**
   - Different folders වල multiple bots run කරන්න පුළුවන්
   - Different WhatsApp numbers use කරන්න

2. **Custom Commands:**
   - `bot.js` file එකේ නව commands add කරන්න පුළුවන්
   - Prefix change කරන්න පුළුවන්

3. **Auto Restart:**
   - PM2 use කරන්න VPS එකේ
   - Termux එකේ cron job use කරන්න පුළුවන්

4. **Backup:**
   - `auth_info` folder එක backup කරගන්න
   - Re-scan කරන්න වෙන්නේ නැහැ

---

## 🆘 SUPPORT & HELP

Issues තියෙනවා නම්:

1. README හොඳින් කියවන්න
2. Troubleshooting section එක බලන්න
3. Bot logs check කරන්න
4. Google එකේ search කරන්න
5. Community forums වල අහන්න

---

## 📜 LICENSE

MIT License - Free to use, modify, and distribute

---

## ⭐ FEATURES COMING SOON

- [ ] AI Chat Integration
- [ ] Advanced Group Management
- [ ] Custom Sticker Packs
- [ ] Voice Note Features
- [ ] Advanced Download Options
- [ ] Database Integration
- [ ] Multi-Language Support
- [ ] Web Dashboard
- [ ] More Fun Commands
- [ ] Enhanced Security

---

## 🙏 CREDITS

- **Developer:** Super Developer
- **Library:** [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys)
- **Node.js:** [nodejs.org](https://nodejs.org/)

---

<div align="center">

### Made with ❤️ in Sri Lanka 🇱🇰

**⭐ Star this repo if you like it!**

**🔄 Share with your friends!**

**💬 Report issues or suggest features!**

</div>

---

## 📞 CONTACT

Bot owner contact කරන්න නම් `.owner` command use කරන්න

---

**🚀 Happy Bot-ing! Enjoy your Super Bot! 🎉**
