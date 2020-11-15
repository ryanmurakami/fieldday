const AWS = require('aws-sdk')
const fetch = require('node-fetch')
const { getIsRunning } = require('../services/eventTracker')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })

// initialize
module.exports = function (router) {
  router.get('/status', status)
}

// APIs
async function status (req, res) {
  let dynamoConnection = false
  let internetConnection = false

  try {
    dynamoConnection = await _checkDynamoConnection()
    internetConnection = await _checkInternetConnection()
  } catch (err) {
    console.log('error in fetching status')
  }

  return res.status(200).json({
    status: {
      dynamoDB: dynamoConnection,
      internet: internetConnection,
      isRunning: getIsRunning()
    }
  })
}

async function _checkDynamoConnection () {
  const params = {
    TableName: process.env.EVENTS_DATABASE,
    Limit: 1
  }

  try {
    await dynamoDB.scan(params).promise()
    return {
      status: true,
      msg: null
    }
  } catch (err) {
    return {
      status: false,
      msg: `Failed to connect to DynamoDB with ${err.code}`
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
