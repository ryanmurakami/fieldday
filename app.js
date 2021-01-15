require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const v1 = require('./routes/routes')
const loader = require('./loaders/mock')
const { logger } = require('./services/helper')

// Set data
loader()

// start app
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

require('./services/authentication')(passport)

// Setup passport session
if (process.env.REDISSTORE_URL && process.env.REDISSTORE_SECRET) {
  app.use(session({
    store: new RedisStore({
      url: process.env.REDISSTORE_URL
    }),
    secret: process.env.REDISSTORE_SECRET,
    resave: false,
    saveUninitialized: false
  }))
} else {
  app.use(session({ secret: 'some_secret',
                  saveUninitialized: true,
                  resave: true }))
}

app.use(passport.initialize())
app.use(passport.session())

app.use(require('flash')());

// port
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// Serve static client files
app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.use('/api', v1.router)

// Default if no match
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

app.listen(port, () => {
  logger.info(`Listening on port ${port}`)
})
