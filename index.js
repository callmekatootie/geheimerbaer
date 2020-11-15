const nacl = require('tweetnacl')
const util = nacl.util = require('tweetnacl-util')

const pair1 = nacl.box.keyPair()
const pair2 = nacl.box.keyPair()

const pubKey1 = nacl.util.encodeBase64(pair1.publicKey)
const priKey1 = nacl.util.encodeBase64(pair1.secretKey)

const pubKey2 = nacl.util.encodeBase64(pair2.publicKey)
const priKey2 = nacl.util.encodeBase64(pair2.secretKey)

const nonce = nacl.randomBytes(nacl.secretbox.nonceLength )

console.log(`Dad: ${pubKey1} / ${priKey1}`)
console.log(`Hans: ${pubKey2} / ${priKey2}`)
console.log(`Nonce: ${nacl.util.encodeBase64(nonce)}`)

//console.log(nacl.util.encodeBase64(nacl.box.keyPair.fromSecretKey(pair1.secretKey).publicKey))
const encMsg = nacl.box(nacl.util.decodeUTF8('Lazybaer is king'), nonce, pair2.publicKey, pair1.secretKey)

console.log(`encMsg: ${nacl.util.encodeBase64(encMsg)}`)

const decMsg = nacl.box.open(encMsg, nonce, pair2.publicKey, pair1.secretKey)

console.log(nacl.util.encodeUTF8(decMsg))
