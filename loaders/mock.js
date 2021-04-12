const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs').promises
const events = require('../data/default/events.json')
const competitors = require('../data/default/competitors.json')
const { logger } = require('../services/helper')

function resetLocalData (app) {
  return new Promise(async (resolve, reject) => {
    let data
    AWS.config.update({ region: app.get('awsRegion') })
    _addEventsToCompetitors(events, competitors)

    try {
      const obj = { id: '1', competitors, events }
      data = await _uploadToDynamo(process.env.DYNAMO_TABLE, obj)
    } catch (err) {
      logger.error(`Failed to connect to DynamoDB with ${err.code}`)
    }

    try {
      // setup default file to live file
      await fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'events.json'), JSON.stringify(events))
      await fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'), JSON.stringify(competitors))
    } catch (err) {
      logger.error('Error creating live files.', err)
      reject(err)
    }

    resolve(data)
  })
}

async function _uploadToDynamo (tableName, item) {
  const dynamoDB = new AWS.DynamoDB.DocumentClient()
  const params = {
    Key: {
      id: '1'
    },
    TableName: tableName
  }

  try {
    const response = await dynamoDB.get(params).promise()

    let dynamoItem = {}
    if (response && response.Item) {
      dynamoItem = response.Item
    }

    const putParams = {
      Item: {
        ...dynamoItem,
        ...item
      },
      TableName: tableName
    }

    await dynamoDB.put(putParams).promise()
    return response?.Item || null
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
