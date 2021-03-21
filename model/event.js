const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const { unmarshallArray } = require('../services/helper')
const { get: getRegion } = require('../loaders/region')

const dynamoDB = new AWS.DynamoDB({ region: getRegion() })

async function getEvents () {
  const params = {
    TableName: process.env.EVENTS_DATABASE
  }

  try {
    const result = await dynamoDB.scan(params).promise()
    return unmarshallArray(result.Items)
  } catch (err) {
    const rawdata = fs.readFileSync(
      path.join(__dirname, '../', 'data', 'modified', 'events.json'))
    const events = JSON.parse(rawdata)

    return events
  }
}

async function saveEvents (events) {
  const docConvert = AWS.DynamoDB.Converter
  const putRequest = []

  for (const i in events) {
    putRequest.push({
      PutRequest: {
        Item: docConvert.marshall(events[i])
      }
    })
  };

  const params = {
    RequestItems: {
      [process.env.EVENTS_DATABASE]: putRequest
    }
  }

  try {
    await dynamoDB.batchWriteItem(params).promise()
  } catch (err) {
    fs.writeFile(
      path.join(__dirname, '../', 'data', 'modified', 'events.json'),
      JSON.stringify(events), (error) => {
        // In case of a error throw err exception.
        if (error) {
          throw error
        }
      })
  } finally {
    return null
  }
}

module.exports = {
  getEvents,
  saveEvents
}
