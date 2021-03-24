const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const { unmarshallItem } = require('../services/helper')

async function getEvents () {
  const params = {
    Key: {
      "id": {
        N: "1"
      }
    },
    TableName: process.env.MAIN_DATABASE
  }

  try {
    const result = await dynamoDB.getItem(params).promise()
    return unmarshallItem(result.Item).events
  } catch (err) {
    const rawdata = fs.readFileSync(
      path.join(__dirname, '../', 'data', 'modified', 'events.json'))
    const events = JSON.parse(rawdata)

    return events
  }
}

async function saveEvents (events) {
  const params = {
    TableName: tableName,
    Item: {
      "id": 1,
      "events": events
    }
  }

  try {
    await dynamoDB.put(params).promise()
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
