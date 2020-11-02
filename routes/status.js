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
  try {
    const dynamoConnection = await _checkDynamoConnection()
    const internetConnection = await _checkInternetConnection()

    return res.status(200).json({
      status: {
        dynamoDB: dynamoConnection,
        internet: internetConnection,
        isRunning: getIsRunning()
      }
    })
  } catch (err) {
    return res.status(502).json({
      msg: err
    })
  }
}

function _checkDynamoConnection () {
  return new Promise(async function (resolve) {
    const params = {
      TableName: 'fieldDayDemo_event',
      Limit: 1
    }

    try {
      await dynamoDB.scan(params).promise()
      resolve(true)
    } catch (err) {
      console.log(err, err.stack)
      resolve(false)
    }
  })
}

function _checkInternetConnection () {
  return new Promise(async function (resolve) {
    try {
      const host = 'https://www.google.com/'
      const response = await fetch(host)
      if (response.status === 200) {
        resolve(true)
      }
    } catch (err) {
      console.log(err)
      resolve(false)
    }
  })
}
