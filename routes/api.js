const fs = require('fs').promises
const path = require('path')
const express = require('express')
const nacl = require('../common/nacl')
const steno = require('../common/steno')
const fnc = require('filename-changer')

const router = express.Router()

router.get('/nonce', function (req, res, next) {
  res.json({ nonce: nacl.generateNonce()})
})

router.get('/random-key', function (req, res, next) {
  res.json({ randomKey: nacl.generateRandomKey()})
})

router.get('/keypair', function (req, res, next) {
  res.json(nacl.generateKeyPair())
})

router.post('/encode', async (req, res) => {
  console.log(req.body)

  if (req.files) {
    const inFile = path.join(__dirname, '/../imgTemp/', req.files.imagefile.name)
    const outFile = fnc(inFile, '{dirname}/{filename}-enc.{ext}')
    console.log(`inFile: ${inFile}`, `outFile: ${outFile}`)

    req.files.imagefile.mv(inFile, async (err) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      }

      const secretMsg = nacl.encodeWithKey(req.body.key, req.body.nonce, req.body.msg)
      await steno.encode(req.msg, inFile, outFile)

      if (req.body.encodeBase64 && (req.body.encodeBase64 === 'true')) {
        console.log('encoding for base64')
        fs.readFile(outFile).then((data) => {
          res.writeHead(200, {
            'Content-Type': `image/${fnc(outFile, '{ext')}`,
            'Content-Length': data.length
          })

          res.end(data.toString('base64'))
          console.log('sent')
        }).catch((err) => {
          res.status(500).json(err)
        })
      } else {
        console.log('sending file')
        // res.setHeader('Content-Type', 'application/download')
        res.sendFile(outFile)
      }
    })
  } else {
    res.status(500).json({ err: 'no file' })
  }
})

router.post('/decode', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
