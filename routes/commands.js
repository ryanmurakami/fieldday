const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const {
  resetEvent,
  stopEvent,
  startEvent
} = require('../services/eventTracker')
const fileLoader = require('../loaders/mock')
const { logger } = require('../services/helper')
const { update } = require('lodash')

// initialize
module.exports = function (router) {
  router.get('/commands/:commands', getCommand)
  router.post('/commands/:commands', postCommand)
}

// APIs
function postCommand(req, res) {
  if (req.params.commands === 'update') {
    return update(req, res)
  } else if (req.params.commands === 'reset') {
    return resetServer()
  }

  return res.status(404).json({
    status: 'invalid command triggered'
  })
}

function update(req, res) {
  const params = {
    TableName: process.env.MAIN_DATABASE,
    Item: {
      "id": 1,
      "config": {
        "redis_url": req.body.redis_url
      }
    }
  }

  try {
    await dynamoDB.put(params).promise()
    return res.status(200).json({
      status: 'Redux link updated'
    })
  } catch (err) {
    return res.status(502).json({
      status: 'Failed to update link'
    })
  }
}

function resetServer() {
  logger.info('restarting service')
  process.exit(1)
}

function getCommand (req, res) {
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
  fileLoader()

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
