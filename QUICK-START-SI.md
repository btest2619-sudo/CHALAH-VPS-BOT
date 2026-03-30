# 🚀 QUICK START GUIDE - ඉක්මන් Setup උපදෙස්

## ⚡ 5 විනාඩි Setup

### TERMUX එකේ Setup කරන්න:

```bash
# 1️⃣ Storage permission දෙන්න
termux-setup-storage

# 2️⃣ System update කරන්න
pkg update && pkg upgrade -y

# 3️⃣ Bot files copy කරන්න ඔබේ phone එකේ
# Files: bot.js, package.json, setup.sh, README.md

# 4️⃣ Bot folder එකට යන්න
cd /sdcard/super-bot

# 5️⃣ Setup run කරන්න
chmod +x setup.sh
bash setup.sh

# 6️⃣ ඔබේ WhatsApp number enter කරන්න
# Example: 94771234567

# 7️⃣ Bot start කරන්න
npm start
```

### QR CODE SCAN කරන්න:

1. Terminal එකේ QR code පෙන්වයි
2. WhatsApp > Settings > Linked Devices
3. "Link a Device" click කරන්න
4. QR code scan කරන්න
5. Bot connect වෙයි! ✅

### පළමු TEST:

WhatsApp එකේ bot number එකට message එකක් යවන්න:
```
.menu
```

Bot reply කරනවා නම් - **SUCCESS!** 🎉

---

## 📱 TERMUX TIPS

### Background එකේ Run කරන්න:

```bash
# Wake lock enable කරන්න
termux-wake-lock

# Screen use කරන්න
pkg install screen -y
screen -S bot
npm start
# Ctrl+A+D එකට press කරන්න (detach)

# පස්සේ attach වෙන්න
screen -r bot
```

### Auto Start Setup:

```bash
# Termux boot script එකක් හදන්න
mkdir -p ~/.termux/boot
nano ~/.termux/boot/start-bot.sh

# මේක paste කරන්න:
#!/data/data/com.termux/files/usr/bin/bash
cd /sdcard/super-bot
npm start
```

---

## 🖥️ VPS QUICK SETUP

```bash
# Root login වෙලා
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs git

# Clone bot
git clone YOUR_REPO_URL super-bot
cd super-bot

# Run setup
chmod +x setup.sh
bash setup.sh

# Start with PM2 (24/7 running)
npm install -g pm2
pm2 start bot.js --name "super-bot"
pm2 startup
pm2 save
```

---

## 🔧 වඩාත්ම භාවිතා වන Commands

```
.menu       - Commands list
.alive      - Bot status
.ping       - Speed test
.sticker    - Photo to sticker
.song       - Download song
.video      - Download video
.tagall     - Tag everyone (groups)
.vv         - View once bypass
```

---

## ⚠️ Common Errors & Solutions

### "Cannot find module"
```bash
npm install
```

### "Permission denied"
```bash
chmod +x setup.sh
termux-setup-storage
```

### "Port already in use"
```bash
pkill node
npm start
```

### QR Code පෙන්වන්නේ නැහැ
```bash
npm install qrcode-terminal
node bot.js
```

### Bot disconnect වෙනවා
```bash
rm -rf auth_info
node bot.js
# QR scan කරන්න again
```

---

## 💡 Pro Tips

1. **Battery Optimization OFF කරන්න:**
   - Settings > Apps > Termux
   - Battery > Unrestricted

2. **Data Saver OFF කරන්න:**
   - WhatsApp works properly

3. **Backup `auth_info` folder:**
   - QR scan කරන්න වෙන්නේ නැහැ

4. **Use Testing Number:**
   - Official number එකක් use කරන්න එපා

5. **Good Internet:**
   - Stable connection ඕනි

---

## 📞 Need Help?

1. README.md file පුර කියවන්න
2. Troubleshooting section බලන්න
3. Logs check කරන්න: `pm2 logs` or `node bot.js`
4. Google search කරන්න error එක
5. Community forums වල අහන්න

---

## ✅ Success Checklist

- [x] Node.js installed
- [x] Bot files downloaded
- [x] Dependencies installed
- [x] Bot started
- [x] QR code scanned
- [x] Bot responding to commands
- [x] Background running enabled

---

**🎉 ඔබේ Bot දැන් Ready! Enjoy! 🚀**

Bot problems නැති නම් `.menu` send කරලා commands list එක බලන්න!

**⭐ Happy Bot-ing! ⭐**
