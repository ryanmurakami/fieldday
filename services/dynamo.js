const AWS = require('aws-sdk')

const { get: getRegion } = require('../loaders/region')

const dynamoDB = new AWS.DynamoDB.DocumentClient()

async function get () {
  AWS.config.update({ region: getRegion('awsRegion') })

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
    console.error('Error getting data from dynamo', err)
    throw err
  }
}

async function update (data) {
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

module.exports = {
  get,
  update
}