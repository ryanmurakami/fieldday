const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const unmarshallArray = require('../services/helper')

async function getCompetitors () {
  const params = {
    TableName: process.env.COMPETITORS_DATABASE
  }

  try {
    const result = await dynamoDB.scan(params).promise()
    return unmarshallArray(result.Items)
  } catch (err) {
    const rawdata = fs.readFileSync(
      path.join(__dirname, '../', 'data', 'modified', 'competitors.json'))
    const competitors = JSON.parse(rawdata)

    return competitors
  }
}

async function saveCompetitors (competitors) {
  const docConvert = AWS.DynamoDB.Converter
  const putRequest = []

  for (const i in competitors) {
    putRequest.push({
      PutRequest: {
        Item: docConvert.marshall(competitors[i])
      }
    })
  };

  const params = {
    RequestItems: {
      [process.env.COMPETITORS_DATABASE]: putRequest
    }
  }

  try {
    await dynamoDB.batchWriteItem(params).promise()
  } catch (err) {
    fs.writeFile(
      path.join(__dirname, '../', 'data', 'modified', 'competitors.json'),
      JSON.stringify(competitors), (error) => {
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
  getCompetitors,
  saveCompetitors
}
