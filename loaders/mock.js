const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const events = require('../data/default/events.json')
const competitors = require('../data/default/competitors.json')
const { logger } = require('../services/helper')

const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })

async function resetLocalData () {
  _addEventsToCompetitors(events, competitors)
  // Problem - this is in memory, but we are trying to save it to local
  try {
    await _uploadToDynamo(process.env.EVENTS_DATABASE, events)
    await _uploadToDynamo(process.env.COMPETITORS_DATABASE, competitors)
  } catch (err) {
    logger.error(`Failed to connect to DynamoDB with ${err.code}`)
  }

  // setup default file to live file
  fs.writeFile(
    path.join(__dirname, '../', 'data', 'modified', 'events.json'),
    JSON.stringify(events), (error) => {
      // In case of a error throw err exception.
      if (error) {
        throw error
      }
    })

  fs.writeFile(
    path.join(__dirname, '../', 'data', 'modified', 'competitors.json'),
    JSON.stringify(competitors), (error) => {
      // In case of a error throw err exception.
      if (error) {
        throw error
      }
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
    await dynamoDB.batchWriteItem(params).promise()
    return null
  } catch (err) {
    throw (err)
  }
}

function _addEventsToCompetitors (events, competitors) {
  for (const i in events) {
    for (const j in competitors) {
      const event = {
        name: events[i].name,
        rank: null,
        time: null
      }

      competitors[j].events.push(event)
    }
  }
}

module.exports = resetLocalData
