const {
  resetEvent,
  stopEvent,
  startEvent
} = require('../services/eventTracker')
const { update: updateDynamo } = require('../services/dynamo')
const fileLoader = require('../loaders/mock')
const { logger } = require('../services/helper')

// initialize
module.exports = function (router) {
  router.get('/commands/:commands', command)
  router.post('/commands/saveEndpoint', saveEndpoint)
}

// APIs
async function command (req, res) {
  if (req.params.commands === 'reset') {
    return reset(res)
  } else if (req.params.commands === 'stop') {
    return stop(res)
  } else if (req.params.commands === 'start') {
    return start(res)
  }

  return res.status(404).json({
    status: 'invalid command triggered'
  })
}

function reset (res) {
  logger.info('reseting simulation')
  resetEvent()
  fileLoader(res.app)

  return res.status(200).json({
    status: 'State has been reset'
  })
}

function stop (res) {
  logger.info('stopping simulation')
  stopEvent()

  return res.status(200).json({
    status: 'State has been stopped'
  })
}

function start (res) {
  logger.info('starting simulation')
  startEvent()

  return res.status(200).json({
    status: 'State has been started'
  })
}

async function saveEndpoint (req, res) {
  logger.info('Saving Redis endpoint')

  try {
    await updateDynamo({
      elastiCacheUrl: req.body.elastiCacheUrl
    })
    logger.info('Redis endpoint has been updated to:', req.body.elastiCacheUrl)
    return res.sendStatus(200)
  } catch (err) {
    logger.error('Failed to update Redis endpoint')
    return res.sendStatus(503)
  }
}
