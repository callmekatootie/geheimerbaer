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

      try {
        await steno.encode(secretMsg, inFile, outFile) // CWD-- secretMsg goes here req.body.msg
      } catch (err) {
        console.log(`Message: ${err}`)
        res.status(500).json({ err: err.toString() })
        return
      }

      if (req.body.encodeBase64 && (req.body.encodeBase64 === 'true')) {
        console.log('encoding for base64')
        fs.readFile(outFile).then((data) => {
          const dataBase64 = data.toString('base64')
          res.writeHead(200, {
            'Content-Type': `image/${fnc(outFile, '{ext}')}`,
            'Content-Length': dataBase64.length
          })

          res.end(dataBase64)
          console.log('sent')
        }).catch((err) => {
          console.log(err)
          res.status(500).json({ err })
        })

        try {
          await fs.unlink(inFile)
          await fs.unlink(outFile)
        } catch (err) {
          console.log(err)
        }
      } else {
        console.log('sending file')
        // res.setHeader('Content-Type', 'application/download')
        res.sendFile(outFile)

        try {
          await fs.unlink(inFile)
          await fs.unlink(outFile)
        } catch (err) {
          console.log(err)
        }
      }
    })
  } else {
    res.status(500).json({ err: 'no file' })
  }
})

router.post('/decode', async (req, res, next) => {
  console.log(req.body)

  if (req.files) {
    const inFile = path.join(__dirname, '/../imgTemp/', req.files.imagefile.name)

    console.log(`inFile: ${inFile}`)

    req.files.imagefile.mv(inFile, async (err) => {
      if (err) {
        console.log(err)
        res.status(500).json(err)
      }

      const encMessage = await steno.decode(inFile)
      const message = nacl.decodeWithKey(req.body.key, req.body.nonce, encMessage)

      try {
        await fs.unlink(inFile)
      } catch (err) {
        console.log(err)
      }

      res.json({ message })
    })
  } else {
    res.status(500).json({ err: 'no file' })
  }})

module.exports = router
