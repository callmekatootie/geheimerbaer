const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Geheimerbaer' })
})

router.get('/encode-symmetric', function (req, res, next) {
  res.render('encode-symmetric', { title: 'Geheimerbaer' })
})

router.get('/encode-asymmetric', function (req, res, next) {
  res.render('encode-asymmetric', { title: 'Geheimerbaer' })
})



module.exports = router
