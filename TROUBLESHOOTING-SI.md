# 🔧 TROUBLESHOOTING GUIDE - ගැටලු විසඳීමේ මාර්ගෝපදේශය

## 🚨 Common Problems & Solutions

---

## 1️⃣ BOT START වෙන්නේ නැහැ

### Problem: "Cannot find module" Error

**Solution:**
```bash
# node_modules delete කරලා reinstall කරන්න
rm -rf node_modules
npm install

# හෝ
npm install --force
```

### Problem: "Permission denied"

**Solution:**
```bash
# Termux එකේ
termux-setup-storage
chmod +x setup.sh
chmod +x start.sh

# VPS එකේ
sudo chmod +x setup.sh
sudo chmod +x start.sh
```

### Problem: "Node.js not found"

**Solution:**
```bash
# Termux එකේ
pkg install nodejs -y

# VPS එකේ (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Version check කරන්න
node -v
npm -v
```

---

## 2️⃣ QR CODE ගැටලු

### Problem: QR Code පෙන්වන්නේ නැහැ

**Solution 1:**
```bash
# qrcode-terminal install කරන්න
npm install qrcode-terminal

# Bot restart කරන්න
node bot.js
```

**Solution 2:**
```bash
# Terminal clear කරලා try කරන්න
clear
node bot.js
```

**Solution 3:**
```bash
# auth_info folder delete කරන්න
rm -rf auth_info
node bot.js
```

### Problem: QR Code scan කරලා වැඩ වෙන්නේ නැහැ

**Checklist:**
- [ ] WhatsApp updated to latest version
- [ ] Phone හොඳ internet connection එකක්
- [ ] "Linked Devices" limit එක full වෙලා නැහැ (max 5)
- [ ] QR code එක expired වෙලා නැහැ (2 minutes)

**Solution:**
1. WhatsApp > Settings > Linked Devices
2. පරණ devices unlink කරන්න
3. "Link a Device" click කරන්න
4. QR code scan කරන්න fast

---

## 3️⃣ BOT DISCONNECT වෙනවා

### Problem: Bot නිතරම disconnect වෙනවා

**Solution 1 - Internet Connection:**
```bash
# Internet connection check කරන්න
ping google.com

# WiFi වෙනුවට mobile data try කරන්න
# හෝ
# Mobile data වෙනුවට WiFi try කරන්න
```

**Solution 2 - Reconnect:**
```bash
# auth_info delete කරලා reconnect කරන්න
rm -rf auth_info
node bot.js
# QR scan කරන්න again
```

**Solution 3 - Update Baileys:**
```bash
npm update @whiskeysockets/baileys
npm install
node bot.js
```

---

## 4️⃣ COMMANDS වැඩ කරන්නේ නැහැ

### Problem: Commands respond කරන්නේ නැහැ

**Check 1 - Prefix:**
```
Correct: .menu
Wrong: menu, /menu, !menu
```

**Check 2 - Bot Active:**
```bash
# Logs check කරන්න
node bot.js

# Terminal එකේ [CMD] පෙන්වනවාද බලන්න
```

**Check 3 - Group Settings:**
- Bot එක admin ද?
- Group restricted නැහැද?
- Bot block වෙලා නැහැද?

**Solution:**
```bash
# Bot restart කරන්න
Ctrl+C (stop)
npm start
```

---

## 5️⃣ DOWNLOAD COMMANDS වැඩ කරන්නේ නැහැ

### Problem: Songs/Videos download වෙන්නේ නැහැ

**Solution:**
```bash
# ytdl-core සහ yt-search reinstall කරන්න
npm uninstall ytdl-core yt-search
npm install ytdl-core@latest yt-search@latest

# Bot restart කරන්න
npm start
```

### Problem: "Video unavailable" Error

**Reasons:**
1. Video geo-blocked විය හැකියි
2. Video private/deleted විය හැකියි
3. Age-restricted video විය හැකියි

**Try:**
- වෙනත් video එකක් try කරන්න
- Direct URL එක use කරන්න

---

## 6️⃣ TERMUX SPECIFIC ගැටලු

### Problem: Termux background එකේ stop වෙනවා

**Solution 1 - Wake Lock:**
```bash
# Wake lock enable කරන්න
termux-wake-lock

# Boot script එකක් හදන්න
mkdir -p ~/.termux/boot
echo "termux-wake-lock" > ~/.termux/boot/start-wakelock.sh
chmod +x ~/.termux/boot/start-wakelock.sh
```

**Solution 2 - Battery Settings:**
1. Settings > Apps > Termux
2. Battery > Unrestricted
3. Battery Optimization OFF

**Solution 3 - Screen Session:**
```bash
# Screen install කරන්න
pkg install screen -y

# Screen session එකක් start කරන්න
screen -S bot
npm start

# Detach කරන්න (Ctrl+A then D)
# Attach වෙන්න
screen -r bot
```

### Problem: Storage permission නැහැ

**Solution:**
```bash
termux-setup-storage

# Termux app permission check කරන්න
Settings > Apps > Termux > Permissions > Storage (ON)
```

---

## 7️⃣ VPS SPECIFIC ගැටලු

### Problem: Port already in use

**Solution:**
```bash
# Port use කරන process එක kill කරන්න
sudo lsof -i :3000  # port number check කරන්න
sudo kill -9 [PID]

# හෝ
pkill node
```

### Problem: PM2 වැඩ කරන්නේ නැහැ

**Solution:**
```bash
# PM2 reinstall කරන්න
npm uninstall -g pm2
npm install -g pm2

# Bot restart කරන්න
pm2 restart super-bot

# PM2 logs check කරන්න
pm2 logs super-bot
```

### Problem: Bot auto-start වෙන්නේ නැහැ

**Solution:**
```bash
# PM2 startup configuration
pm2 startup
# Command එක copy කරලා run කරන්න

# Save current process list
pm2 save

# Reboot කරලා test කරන්න
sudo reboot
```

---

## 8️⃣ WHATSAPP BAN ගැටලු

### Problem: "This account is not allowed to use WhatsApp"

**Prevention:**
1. ✅ Testing account එකක් use කරන්න (main number නෙමෙයි)
2. ✅ Spam messages යවන්න එපා
3. ✅ වැඩිය groups වලට messages යවන්න එපා
4. ✅ Suspicious behavior avoid කරන්න
5. ✅ Bot හොඳට test කරන්න small groups වල

**If Banned:**
- New number එකක් use කරන්න ඕනි
- Appeal කරන්න try කරන්න (rarely works)
- Main account එක සදහටම ban වෙන්න පුළුවන්

**Safety Tips:**
```
❌ Don't:
- Use main WhatsApp number
- Send 100+ messages per minute
- Auto-reply to everyone
- Join random groups automatically
- Use bot for commercial spam

✅ Do:
- Use secondary number
- Rate limit your commands
- Test in small groups first
- Respect WhatsApp ToS
- Use for personal/educational purposes
```

---

## 9️⃣ DEPENDENCY ගැටලු

### Problem: Package installation failed

**Solution:**
```bash
# Cache clear කරන්න
npm cache clean --force

# node_modules සහ package-lock.json delete කරන්න
rm -rf node_modules package-lock.json

# Reinstall කරන්න
npm install

# හෝ force install කරන්න
npm install --force
```

### Problem: Python/Build tools errors

**Solution - Termux:**
```bash
pkg install python -y
pkg install build-essential -y
```

**Solution - VPS:**
```bash
sudo apt install python3 python3-pip build-essential -y
```

---

## 🔟 MEMORY/PERFORMANCE ගැටලු

### Problem: Bot slow වෙනවා / crash වෙනවා

**Solution 1 - Memory Check:**
```bash
# Termux එකේ
free -h

# Process memory usage
top
```

**Solution 2 - Restart Bot:**
```bash
# Simple restart
Ctrl+C
npm start

# PM2 restart (VPS)
pm2 restart super-bot
```

**Solution 3 - Clear Logs:**
```bash
# Old logs delete කරන්න
rm -rf logs/
rm *.log
```

**Solution 4 - Reduce Features:**
```javascript
// bot.js එකේ config change කරන්න
const config = {
    autoSeen: false,  // Disable auto seen
    autoLike: false,  // Disable auto like
    antiDelete: false // Disable anti-delete
};
```

---

## 1️⃣1️⃣ LOGS & DEBUGGING

### Check Logs - Termux:
```bash
# Direct run (logs පෙන්වයි)
node bot.js

# හෝ logs file එකක් හදන්න
node bot.js > bot.log 2>&1 &

# Logs read කරන්න
tail -f bot.log
```

### Check Logs - VPS with PM2:
```bash
# Real-time logs
pm2 logs super-bot

# Logs file
pm2 logs super-bot --lines 100

# Error logs විතරක්
pm2 logs super-bot --err

# Clear logs
pm2 flush
```

### Enable Debug Mode:
```javascript
// bot.js top එකේ
const DEBUG = true;

// Everywhere
if (DEBUG) console.log('Debug:', data);
```

---

## 1️⃣2️⃣ ERROR MESSAGES සහ SOLUTIONS

### "ECONNREFUSED"
```
Problem: Internet connection issue
Solution: Internet connection check කරන්න
```

### "MODULE_NOT_FOUND"
```
Problem: Package missing
Solution: npm install
```

### "EACCES: permission denied"
```
Problem: Permission issue
Solution: chmod +x filename හෝ sudo use කරන්න
```

### "Cannot read property of undefined"
```
Problem: Code error
Solution: bot.js check කරන්න, latest version use කරන්න
```

### "Too many requests"
```
Problem: Rate limit hit
Solution: Slow down, wait, try again
```

---

## 🆘 STILL NOT WORKING?

### Step 1: Fresh Install
```bash
# Everything delete කරලා fresh start
cd ..
rm -rf super-bot
git clone YOUR_REPO super-bot
cd super-bot
bash setup.sh
npm start
```

### Step 2: Check Requirements
```
✅ Node.js 18+ installed
✅ Internet connection stable
✅ WhatsApp updated
✅ Enough storage space
✅ Correct permissions
```

### Step 3: Get Help
```
1. README.md පුර කියවන්න
2. COMMANDS.md check කරන්න
3. Bot logs read කරන්න
4. Google search error message
5. Community forums වල අහන්න
```

---

## 📝 USEFUL COMMANDS

### Termux:
```bash
# Process list
ps aux | grep node

# Kill process
pkill node

# Storage info
df -h

# Memory info
free -h
```

### VPS:
```bash
# System status
systemctl status

# Disk usage
df -h

# Memory usage
free -h

# Network check
ping google.com

# Process monitor
htop
```

---

## 💡 PREVENTION TIPS

1. **Regular Backups:**
   ```bash
   # auth_info backup කරන්න
   cp -r auth_info auth_info_backup
   ```

2. **Keep Updated:**
   ```bash
   # Regular updates
   npm update
   git pull origin main
   ```

3. **Monitor Regularly:**
   ```bash
   # Logs check කරන්න
   pm2 monit  # VPS
   tail -f bot.log  # Termux
   ```

4. **Good Practices:**
   - Testing number use කරන්න
   - Spam කරන්න එපා
   - Rate limits respect කරන්න
   - Logs monitor කරන්න

---

## 🎯 QUICK FIX CHECKLIST

ගැටලුවක් ආවොත් මේක try කරන්න:

- [ ] Bot restart කරන්න
- [ ] Internet connection check කරන්න
- [ ] npm install run කරන්න
- [ ] auth_info delete කරලා reconnect කරන්න
- [ ] Logs read කරලා errors බලන්න
- [ ] Latest version use කරනවාද check කරන්න
- [ ] Permissions හරියට තියෙනවාද බලන්න
- [ ] Fresh install try කරන්න

---

**🔧 Most problems මේ guide එකෙන් solve වෙයි! 🎉**

**💪 Keep trying! Bot එක work කරයි! ✅**

**📱 Problems තව තියෙනවා නම් README.md හොඳින් කියවන්න!**
