const nacl = require('tweetnacl')

nacl.util = require('tweetnacl-util')

function generateKeyPair () {
  const pair = nacl.box.keyPair()
  const publicKey = nacl.util.encodeBase64(pair.publicKey)
  const privateKey = nacl.util.encodeBase64(pair.secretKey)

  return { publicKey, privateKey }
}

function generateNonce () {
  const nonce = nacl.randomBytes(nacl.box.nonceLength )
  return nacl.util.encodeBase64(nonce)
}

function generateRandomKey () {
  const nonce = nacl.randomBytes(nacl.box.secretKeyLength)
  return nacl.util.encodeBase64(nonce)
}

function encodeWithKeys (pubKey, priKey, nonce, plainText) {
  const encMsg = nacl.box(decodeUTF8(plainText), decodeBase64(nonce), decodeBase64(pubKey), decodeBase64(priKey))
  return nacl.util.encodeBase64(encMsg)
}

function decodeWithKeys (pubKey, priKey, nonce, cryptText) {
  const decMsg = nacl.box.open(decodeBase64(cryptText), decodeBase64(nonce), decodeBase64(pubKey), decodeBase64(priKey))
  return nacl.util.encodeUTF8(decMsg)
}

function encodeWithKey (key, nonce, plainText) {
  const secretMsg = nacl.secretbox(nacl.util.decodeUTF8(plainText), decodeBase64(nonce), decodeBase64(key))
  return nacl.util.encodeBase64(secretMsg)
}

function decodeWithKey (key, nonce, cryptText) {
  const plainMsg = nacl.secretbox.open(nacl.util.decodeBase64(cryptText), decodeBase64(nonce), decodeBase64(key))
  return nacl.util.encodeUTF8(plainMsg)
}

function decodeUTF8 (text) {
  return nacl.util.decodeUTF8(text)
}

function encodeUTF8 (text) {
  return nacl.util.encodeUTF8(text)
}

function encodeBase64 (text) {
  return nacl.util.encodeBase64(text)
}

function decodeBase64 (text) {
  return nacl.util.decodeBase64(text)
}

module.exports = {
  generateKeyPair,
  generateRandomKey,
  generateNonce,
  encodeWithKeys,
  decodeWithKeys,
  encodeWithKey,
  decodeWithKey,
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64
}
