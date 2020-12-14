const express = require('express')
const passport = require('passport')
const { Strategy } = require('passport-twitter')

const router = express.Router()

let trustProxy = false

if (process.env.DYNO) {
  trustProxy = true
}

passport.use(new Strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  proxy: trustProxy
}, (token, tokenSecret, profile, cb) => {
  const { displayName, photos } = profile
  cb(null, { displayName, photos })
}))

passport.serializeUser((user, cb) => cb(null, user))

passport.deserializeUser((obj, cb) => cb(null, obj))

router.get('/twitter/login', passport.authenticate('twitter'))

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/profile', (req, res) => {
  if (!req.user) {
    res.send({ isLoggedIn: false })
  } else {
    res.send({ ...req.user, isLoggedIn: true })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error occurred on logout. Error details follow...', err)
    }

    res.redirect('/')
  })
})

module.exports = {
  router,
  passport
}
