const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const events = require('../data/default/events.json')
const competitors = require('../data/default/competitors.json')
const { logger } = require('../services/helper')

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' })

async function resetLocalData () {
  // Problem - this is in memory, but we are trying to save it to local
  try {
    _addEventsToCompetitors(events, competitors)
    await _uploadToDynamo(process.env.MAIN_DATABASE, events, competitors)
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

async function _uploadToDynamo (tableName, events, competitors) {
  const params = {
    TableName: tableName,
    Item: {
      "id": 1,
      "config": {
        "redis_url": ""
      },
      "competitors": competitors,
      "events": events
    },
    ConditionExpression: 'attribute_not_exists(id)'
  }

  try {
    await dynamoDB.put(params).promise()
    return null
  } catch (err) {
    if (err.code == 'ConditionalCheckFailedException') {
      logger.info('Data exist, doing nothing')
      return null
    }

    throw(err)
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
