const AWS = require('aws-sdk')
const fetch = require('node-fetch')

const { getIsRunning } = require('../services/eventTracker')
const { logger } = require('../services/helper')
const { get: getDynamo } = require('../services/dynamo')
const { get: getRegion } = require('../loaders/region')
const initDynamo = require('../loaders/mock')

let dynamoDB

// initialize
module.exports = function (router) {
  router.get('/status', status)
}

// APIs
async function status (req, res) {
  if (!dynamoDB) {
    dynamoDB = _generateClient()
  }

  let data = {}
  let dynamoConnection = false
  let ecConnection = false
  let internetConnection = false

  try {
    data = await getDynamo()

    // dynamo connection works but hasn't
    // been initialized
    if (!data) {
      data = await initDynamo(req.app)
    }

    dynamoConnection = {
      status: true,
      msg: null
    }
  } catch (err) {
    logger.error('Error in DynamoDB connection')
    dynamoConnection = {
      status: false,
      msg: err
    }
  }

  try {
    ecConnection = _checkEcConnection(req, data)
  } catch (err) {
    logger.error('Error in ElastiCache connection')
  }

  try {
    internetConnection = await _checkInternetConnection()
  } catch (err) {
    logger.error('Error in internet connection')
  }

  return res.status(200).json({
    status: {
      dynamoDB: dynamoConnection,
      elastiCache: ecConnection,
      internet: internetConnection,
      isRunning: getIsRunning()
    }
  })
}

function _checkEcConnection (req, data) {
  return {
    url: data?.elastiCacheUrl || '',
    status: (data?.elastiCacheUrl && (req.app.get('cacheType') === 'redis')) ? true : false
  }
}

async function _checkInternetConnection () {
  try {
    const host = 'https://www.google.com/'
    const response = await fetch(host)
    if (response.status === 200) {
      return true
    }
  } catch (err) {
    return false
  }
}

function _generateClient () {
  AWS.config.update({ region: getRegion('awsRegion') })
  return new AWS.DynamoDB.DocumentClient()
}
