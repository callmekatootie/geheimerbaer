const steno = require('../common/steno.js')

async function go () {
  console.log('encoding')
  await steno.encode('lazybaer', `${__dirname}/bear03.png`, `${__dirname}/newBaer.png`)
  console.log('decoding')
  await steno.decode(`${__dirname}/newBaer.png`)
}

go()
