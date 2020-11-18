const jimp = require('jimp')

const CHAR_BIT_LENGTH = 16 // CWD-- 16 bits per Unicode char in ES6
const PIXEL_BYTE_COUNT = 4 // CWD-- 1 byte per RGBA in a pixel
const ONE_BIT = 0b0000000000000001
const EOM = 0b0000000000000000 // CWD-- end of message indicator

async function encode (msg) {
  try {
    const image = await jimp.read(`${__dirname}/bear03.png`)
    const imgData = image.bitmap.data
    const imgBitCount = image.bitmap.width * image.bitmap.height * PIXEL_BYTE_COUNT
    const dataMap = []

    // CWD-- append 2 empty chars at the end of the message to indicate an End of Message
    msg += String.fromCharCode(EOM)
    msg += String.fromCharCode(EOM)
    const msgBitCount = msg.length * CHAR_BIT_LENGTH

    console.log(`${imgBitCount} bits to work with`)
    console.log(`${msgBitCount} bits to in message length`)

    if (imgBitCount < msgBitCount) {
      throw new Error('not enough bits to encode')
    }

    for (let i = 0; i < msg.length; ++i) {
      let c = msg.charCodeAt(i)
      console.log(c)

      for (let ii = 0; ii < CHAR_BIT_LENGTH; ++ii) {
        // console.log(c)
        const b = c & ONE_BIT
        c = c >> 1
        // console.log(b)
        dataMap.push(b)
      }
    }

    console.log(`${dataMap.length} bits set in datamap: ${dataMap}`)

    for (let i = 0; i < dataMap.length; ++i) {
      console.log(imgData[i])
      imgData[i] = imgData[i] ^ dataMap[i]
    }

    await image.writeAsync(`${__dirname}/newBaer.png`, imgData)
  } catch (e) {
    console.log(e)
  }
}

encode('lazybaer')
