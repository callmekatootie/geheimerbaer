const jimp = require('jimp')

const CHAR_BIT_LENGTH = 16 // CWD-- 16 bits per Unicode char in ES6
const PIXEL_BYTE_COUNT = 4 // CWD-- 1 byte per RGBA in a pixel
const PIXEL_BYTE_COUNT_WITHOUT_ALPHA = 4 // CWD-- 1 byte per RGB in a pixel
const ONE_BIT = 0b0000000000000001
const EOM = 0b0000000000000000 // CWD-- end of message indicator

async function encode (msg, inFile, outFile) {
  try {
    const image = await jimp.read(inFile)
    const imgData = image.bitmap.data
    const imgBitCount = image.bitmap.width * image.bitmap.height * (image.hasAlpha() ? PIXEL_BYTE_COUNT : PIXEL_BYTE_COUNT_WITHOUT_ALPHA)
    const dataMap = []

    console.log(`Bitmap size: ${imgData.length}`)
    console.log(`hasAlpha: ${image.hasAlpha()}`)
    console.log(`byte count: ${(image.hasAlpha() ? PIXEL_BYTE_COUNT : PIXEL_BYTE_COUNT_WITHOUT_ALPHA)}`)
    console.log(`imgBitCount: ${imgBitCount}`)
    console.log(`mimeType: ${image.getMIME()}`)

    // CWD-- append 2 empty chars at the end of the message to indicate an End of Message
    msg += String.fromCharCode(EOM)
    msg += String.fromCharCode(EOM)
    const msgBitCount = msg.length * CHAR_BIT_LENGTH

    console.log(`${imgBitCount} bits to work with`)
    console.log(`${msgBitCount} bits to in message length`)

    if (imgBitCount < msgBitCount) { // CWD-- bail out if we can't fit the data
      throw new Error('not enough bits to encode')
    }

    for (let i = 0; i < msg.length; ++i) { // CWD-- loop the message end get the bit map
      let c = msg.charCodeAt(i)
      console.log(c)

      for (let ii = 0; ii < CHAR_BIT_LENGTH; ++ii) { // CWD-- loop the char and get the bits
        // console.log(c)
        const b = c & ONE_BIT // CWD-- get bit
        c = c >> 1 // CWD-- shift bits right to catch next bit
        // console.log(b)
        dataMap.push(b) // CWD-- add bit to data map
      }
    }

    console.log(`${dataMap.length} bits set in datamap: ${dataMap}`)

    for (let i = 0; i < dataMap.length; ++i) { // CWD-- loop the bits
      imgData[i] = (imgData[i] & ~1) | dataMap[i] // CWD-- clear the LSB and replace with that from the map
      console.debug(`mapped ${i}: ${imgData[i]}`)
    }

    await image.writeAsync(outFile, imgData) // CWD-- write out
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function decode (inFile) {
  try {
    const image = await jimp.read(inFile)
    const imgData = image.bitmap.data
    const imgBitCount = image.bitmap.width * image.bitmap.height * (image.hasAlpha() ? PIXEL_BYTE_COUNT : PIXEL_BYTE_COUNT_WITHOUT_ALPHA)
    let eomCount = 0
    let msg = ''

    console.debug(`Bitmap size: ${imgData.length}`)
    console.debug(`image.bitmap.width: ${image.bitmap.width} `)
    console.debug(`image.bitmap.height: ${image.bitmap.height}`)
    console.debug(`hasAlpha: ${image.hasAlpha()}`)
    console.debug(`byte count: ${(image.hasAlpha() ? PIXEL_BYTE_COUNT : PIXEL_BYTE_COUNT_WITHOUT_ALPHA)}`)
    console.debug(`imgBitCount: ${imgBitCount}`)
    console.debug(`mimeType: ${image.getMIME()}`)

    for (let i = 0; i < imgData.length; i += CHAR_BIT_LENGTH) {
      const currentChar = []

      for (let ii = 0; ii < CHAR_BIT_LENGTH; ++ii) { // CWD-- loop 16 bits to get a char
        currentChar[ii] = (imgData[i + ii])
      }

      let c = 0
      console.debug(`currentChar: ${currentChar}`)
      for (let i = currentChar.length - 1; i >= 0; i--) {
        console.debug(`c: ${c}`)
        c = c << 1
        console.debug(`c shifted: ${c}`)
        const bit = currentChar[i] & ONE_BIT // (((currentChar[i] % 2) === 0) ? 1 : 0)
        // c = c ^ bit
        c += bit
        console.debug(`${i})c masked with ${currentChar[i]}, bit value of ${bit}: ${c}\n-------\n`)
      }

      console.debug(`${c} ${String.fromCharCode(c)}\n****\n`)

      if (c === EOM) {
        console.log('First EOM found')
        ++eomCount
      } else {
//        console.log(`counted out ${CHAR_BIT_LENGTH} bits. Adding char to string: ${c}/${String.fromCharCode(c)}`)
        msg += String.fromCharCode(c)
      }

      if (eomCount > 1) {
        console.log('Second EOM found. Breaking out')
        break
      }
    }

    console.debug(msg)
    return msg
  } catch (e) {
    console.debug(e)
    return ''
  }
}

module.exports = {
  decode,
  encode
}
