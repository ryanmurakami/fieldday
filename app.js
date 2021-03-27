require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')

const v1 = require('./routes/routes')
const loader = require('./loaders/mock')
const { load: loadRegion } = require('./loaders/region')
const initializeSessionCache = require('./loaders/session')
const { logger } = require('./services/helper')

// start app
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))

// set AWS region info
loadRegion(app).then(async () => {
  // Set data
  const ecUrl = await loader(app)
  require('./services/authentication')(passport)

  // initialize session
  await initializeSessionCache(app, ecUrl)

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
