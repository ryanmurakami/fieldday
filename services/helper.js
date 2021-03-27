const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'ec2fieldday' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

// used to avoid running middleware on a path
function unless (path, middleware) {
  return function(req, res, next) {
      if (path === req.path) {
          logger.info('skipping health endpoint')
          return next()
      } else {
          return middleware(req, res, next)
      }
  }
}

module.exports = {
  logger,
  unless
}
