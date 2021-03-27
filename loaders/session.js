const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const { logger } = require('../services/helper')

async function initializeSessionCache (app, ecUrl) {
  if (ecUrl && process.env.REDISSTORE_SECRET) {
    try {
      logger.info('Attempting Redis connection')
      const redisClient = await _connectRedis(ecUrl)
      logger.info('Connected to Redis')
      const store = new RedisStore({ client: redisClient })
      app.use(session({
        store: store,
        secret: process.env.REDISSTORE_SECRET,
        resave: false,
        saveUninitialized: false
      }))
      app.set('cacheType', 'redis')
    } catch (err) {
      logger.error('Error connecting to redis:', err)
      _connectMemoryCache(app)
    }
  } else {
    _connectMemoryCache(app)
  }
}

function _connectMemoryCache (app) {
  app.use(session({ secret: 'some_secret',
                    saveUninitialized: true,
                    resave: true }))
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