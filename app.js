require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
const v1 = require('./routes/routes')
const loader = require('./loaders/mock')
const { load: loadRegion } = require('./loaders/region')
const { logger } = require('./services/helper')

// start app
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

// set AWS region info
loadRegion(app).then(() => {
// Set data
loader(app).then((ecUrl) => {
  require('./services/authentication')(passport)

  // Setup passport sessions
  if (ecUrl && process.env.REDISSTORE_SECRET) {
    // TODO: if endpoint doesnt work, we need to not use this
    let redisClient = redis.createClient({
      host: ecUrl,
      port: 6123,
      password: process.env.REDISSTORE_SECRET,
      db: 1,
    })
    redisClient.unref()
    redisClient.on('error', console.log)

    let store = new RedisStore({ client: redisClient })

    app.use(session({
      store: store,
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
  const port = 3000

  app.use(express.json())
  app.use(cors())

  // Serve static client files
  app.use(express.static(path.join(__dirname, 'client', 'dist')))
  app.use(express.static(path.join(__dirname, 'client', 'src', 'static')))

  app.use('/api', v1.router)

  // Default if no match
  app.get('*', (req, res) => {
    res.redirect('/')
  })

  app.listen(port, async () => {
    logger.info(`Listening on port ${port}`)
  })
})

})
