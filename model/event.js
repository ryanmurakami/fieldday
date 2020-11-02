const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const unmarshallArray = require('../services/helper')

function getEvents () {
  return new Promise(async function (resolve) {
    const params = {
      TableName: process.env.EVENTS_DATABASE
    }

    try {
      const result = await dynamoDB.scan(params).promise()
      resolve(unmarshallArray(result.Items))
    } catch (err) {
      console.log(err, err.stack)

      const rawdata = fs.readFileSync(
        path.join(__dirname, '../', 'data', 'modified', 'events.json'))
      const events = JSON.parse(rawdata)

      resolve(events)
    }
  })
}

function saveEvents (events) {
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

  return new Promise(async function (resolve) {
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
      resolve()
    }
  })
}

module.exports = {
  getEvents,
  saveEvents
}
