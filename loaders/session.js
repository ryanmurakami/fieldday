const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport')

const { logger, unless } = require('../services/helper')
const initPassport = require('../services/authentication')

async function initializeSessionCache (app, ecUrl) {
  initPassport(passport)

  if (ecUrl && process.env.REDISSTORE_SECRET) {
    try {
      logger.info('Attempting Redis connection')
      const redisClient = await _connectRedis(ecUrl)
      logger.info('Connected to Redis')
      const store = new RedisStore({ client: redisClient })
      const sessionOpts = {
        store: store,
        secret: process.env.REDISSTORE_SECRET,
        resave: true,
        saveUninitialized: false
      }

      // set session on every path EXCEPT /health
      app.use(unless('/api/health', session(sessionOpts)))
      app.set('cacheType', 'redis')
    } catch (err) {
      logger.error('Error connecting to redis:', err)
      _connectMemoryCache(app)
    }
  } else {
    _connectMemoryCache(app)
  }

  app.use(unless('/api/health', passport.initialize()))
  app.use(unless('/api/health', passport.session()))
}

function _connectMemoryCache (app) {
  const sessionOpts = {
    secret: 'some_secret',
    saveUninitialized: true,
    resave: true
  }

  // set session on every path EXCEPT /health
  app.use(unless('/api/health', session(sessionOpts)))
  app.set('cacheType', 'memory')
}

async function _connectRedis (ecUrl) {
  return new Promise((resolve, reject) => {
    const redisClient = redis.createClient({
      connect_timeout: 5000,
      db: 1,
      host: ecUrl,
      port: 6379
    })
    redisClient.on('error', reject)
    redisClient.on('ready', () => resolve(redisClient))
  })
}

module.exports = initializeSessionCache