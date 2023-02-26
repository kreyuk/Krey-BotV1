const { modul } = require('./module');
const { baileys, boom, chalk, fs, figlet, FileType, pino, process, PhoneNumber } = modul;
const { Boom } = boom
const { default: kreyukConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = baileys
const { color, bgcolor } = require('./lib/color')
const { uncache, nocache } = require('./lib/loader')
const { state, saveState } = useSingleFileAuthState(`./session.json`)
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')

const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString())

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./yuk.js')
nocache('../yuk.js', module => console.log(color('[ UPDATE ]', 'green'), color(`'${module}'`, 'green'), 'Telah Di Perbarui'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ UPDATE ]', 'green'), color(`'${module}'`, 'green'), 'Telah Di Perbarui'))

async function kreyukBot() {
const { version, isLatest } = await fetchLatestBaileysVersion()
const kreyuk = kreyukConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['Krey-bot','Safari','1.0.0'],
auth: state,
version
})

store.bind(kreyuk.ev)

console.log(color(figlet.textSync(`Krey-bot`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'yellow'))



kreyuk.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!kreyuk.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
kr = smsg(kreyuk, kay, store)
require('./yuk')(kreyuk, kr, chatUpdate, store)
} catch (err) {
console.log(err)}})

kreyuk.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
kreyuk.ws.on('CB:call', async (json) => {
    if (json.content[0].tag == 'offer') {
    kreyuk.sendMessage(callerId, { text: `*Block! System*\n*Jangan Menelpon Bot*`})
    await sleep(8000)
    await kreyuk.updateBlockStatus(callerId, "block")
    }
    })

kreyuk.ev.on('contacts.update', update => {
for (let contact of update) {
let id = kreyuk.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

kreyuk.getName = (jid, withoutContact  = false) => {
id = kreyuk.decodeJid(jid)
withoutContact = kreyuk.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = kreyuk.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatskreyukp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatskreyukp.net' ? {
id,
name: 'Whatskreyukp'
} : id === kreyuk.decodeJid(kreyuk.user.id) ?
kreyuk.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatskreyukp.net', '')).getNumber('international')
}

kreyuk.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].mkreyuk(v => v[1] + '@s.whatskreyukp.net')
}

kreyuk.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await kreyuk.getName(i + '@s.whatskreyukp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await kreyuk.getName(i + '@s.whatskreyukp.net')}\n
FN:${await kreyuk.getName(i + '@s.whatskreyukp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
kreyuk.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

kreyuk.sendImage = async (jid, path, ckreyuktion = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await kreyuk.sendMessage(jid, { image: buffer, ckreyuktion: ckreyuktion, ...options }, { quoted })
}

kreyuk.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await kreyuk.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

kreyuk.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await kreyuk.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

kreyuk.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await kreyuk.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

kreyuk.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

kreyuk.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

kreyuk.sendText = (jid, text, quoted = '', options) => kreyuk.sendMessage(jid, { text: text, ...options }, { quoted })

kreyuk.public = true

kreyuk.serializeM = (kr) => smsg(kreyuk, kr, store)

kreyuk.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); kreyuk.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); kreyukBot(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); kreyukBot(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); kreyuk.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); kreyuk.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); kreyukBot(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); kreyukBot(); }
else kreyuk.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
console.log('Connected...', update)
})

kreyuk.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
kreyuk.sendMessage(jid, buttonMessage, { quoted, ...options })
}

kreyuk.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
kreyuk.relayMessage(jid, template.message, { messageId: template.key.id })
}

kreyuk.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
listMessage :{
title: title,
description: text,
buttonText: buttext,
footerText: footer,
listType: "  SELECT  ",
sections: but,
listType: 1
}
}), options)
kreyuk.relayMessage(jid, template.message, { messageId: template.key.id })
}

kreyuk.ev.on('creds.update', saveState)

return kreyuk
}

kreyukBot()