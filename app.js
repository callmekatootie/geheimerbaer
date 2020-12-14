const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const logger = require('morgan')

const apiRouter = require('./routes/api')
const authModule = require('./routes/auth')

const app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
  secret: process.env.SERVER_SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(authModule.passport.initialize())
app.use(authModule.passport.session())
app.use(fileUpload({
  safeFileNames: true,
  preserveExtension: true,
  useTempFiles: true,
//  tempFileDir: path.join(__dirname, 'imgTemp'),
  createParentPath: true,
  debug: true
}))

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.use('/api', apiRouter)
app.use('/auth', authModule.router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
})

module.exports = app
