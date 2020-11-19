const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/encode', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/decode', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
