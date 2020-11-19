const nacl = require('../common/nacl')

const pair1 = nacl.generateKeyPair()
const pair2 = nacl.generateKeyPair()

const nonce = nacl.generateNonce()

const plainText = 'Lazybaer is king'

console.log('Symmetric  encryption:')
console.log(`Alice: ${pair1.publicKey} / ${pair1.privateKey}`)
console.log(`Bob: ${pair2.publicKey} / ${pair2.privateKey}`)
console.log(`Nonce: ${nonce}`)
console.log('plainText: ${plainText')

const encMsg = nacl.encodeWithKeys(pair2.publicKey, pair1.privateKey, nonce, plainText)
console.log(`encMsg: ${encMsg}`)
const decMsg = nacl.decodeWithKeys(pair1.publicKey, pair2.privateKey, nonce, encMsg)
console.log(`decMsg: ${decMsg}`)

console.log('\n-----------------------\n')
console.log('Asymmetric encryption:')
const key = nacl.generateRandomKey()
console.log(`key: ${key}`)
console.log(`Nonce: ${nonce}`)
console.log('plainText: ${plainText')

const secretMsg = nacl.encodeWithKey(key, nonce, plainText)
console.log(`secretMsg: ${secretMsg}`)

const plainMsg = nacl.decodeWithKey(key, nonce, secretMsg)
console.log(`plainMsg: ${plainMsg}`)
