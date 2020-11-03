const AWS = require('aws-sdk')
const path = require('path')
const ncp = require('ncp').ncp
const events = require('../data/default/events.json')
const competitors = require('../data/default/competitors.json')

const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })

async function resetLocalData () {
  try {
    await _uploadToDynamo(process.env.EVENTS_DATABASE, events)
    await _uploadToDynamo(process.env.COMPETITORS_DATABASE, competitors)
  } catch (err) {
    console.log(err, err.stack) // an error occurred
  }
  
  // setup default file to live file
  const source = path.join(__dirname, '../', 'data', 'default')
  const destination = path.join(__dirname, '../', 'data', 'modified')
  ncp(source, destination, function (err) {
    if (err) {
      return console.error(err)
    }

    console.log('Live file prepared')
  })
}

async function _uploadToDynamo (tableName, items) {
  const docConvert = AWS.DynamoDB.Converter
  const putRequest = []

  for (const i in items) {
    putRequest.push({
      PutRequest: {
        Item: docConvert.marshall(items[i])
      }
    })
  };

  const params = {
    RequestItems: {
      [tableName]: putRequest
    }
  }

  try {
    await dynamoDB.batchWriteItem(params).promise();
    return null
  } catch (err) {
    throw(err)
  }
}

module.exports = resetLocalData
