const AWS = require('aws-sdk')
const fetch = require('node-fetch')

const { getIsRunning } = require('../services/eventTracker')
const { logger } = require('../services/helper')
const { get: getDynamo } = require('../services/dynamo')
const { get: getRegion } = require('../loaders/region')

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

  let dynamoConnection = false
  let internetConnection = false

  try {
    dynamoConnection = await _checkDynamoConnection()
    ecConnection = await _checkEcConnection(req)
    internetConnection = await _checkInternetConnection()
  } catch (err) {
    logger.error('error in fetching status')
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

async function _checkDynamoConnection () {
  const params = {
    TableName: process.env.DYNAMO_TABLE,
    Limit: 1
  }

  try {
    await dynamoDB.scan(params).promise()
    return {
      status: true,
      msg: null
    }
  } catch (err) {
    console.log(err)
    return {
      status: false,
      msg: `Failed to connect to DynamoDB with ${err.code}`
    }
  }
}

async function _checkEcConnection (req) {
  try {
    const data = await getDynamo()

    return {
      url: data.elastiCacheUrl || '',
      status: (data.elastiCacheUrl && req.session) ? true : false
    }
  } catch (err) {
    return {
      url: '',
      status: false
    }
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
