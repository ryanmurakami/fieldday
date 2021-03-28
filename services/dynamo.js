const AWS = require('aws-sdk')

const { logger } = require('./helper')
const { get: getRegion } = require('../loaders/region')

let dynamoDB

async function get () {
  if (!dynamoDB) {
    dynamoDB = generateClient()
  }

  const params = {
    Key: {
      id: '1'
    },
    TableName: process.env.DYNAMO_TABLE
  }

  try {
    const response = await dynamoDB.get(params).promise()
    return response.Item
  } catch (err) {
    logger.error('Error getting data from Dynamo', err)
    throw err
  }
}

async function update (data) {
  if (!dynamoDB) {
    dynamoDB = generateClient()
  }

  try {
    const item = await get()
    let dynamoItem = {}
    if (item) {
      dynamoItem = item
    }

    const params = {
      Item: {
        ...dynamoItem,
        ...data
      },
      TableName: process.env.DYNAMO_TABLE
    }

    await dynamoDB.put(params).promise()
    return null
  } catch (err) {
    throw (err)
  }
}

function generateClient () {
  AWS.config.update({ region: getRegion() })
  return new AWS.DynamoDB.DocumentClient()
}

module.exports = {
  get,
  update
}