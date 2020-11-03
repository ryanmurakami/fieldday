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
    console.log(err);
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
    TableName: 'fieldDayDemo_event',
    Limit: 1
  }

  try {
    await dynamoDB.scan(params).promise()
    return true
  } catch (err) {
    console.log(err, err.stack)
    return false
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
    console.log(err)
    return false
  }
}
