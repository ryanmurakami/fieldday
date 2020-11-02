const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const unmarshallArray = require('../services/helper')

function getCompetitors () {
  return new Promise(async function (resolve) {
    const params = {
      TableName: process.env.COMPETITORS_DATABASE
    }

    try {
      const result = await dynamoDB.scan(params).promise()
      resolve(unmarshallArray(result.Items))
    } catch (err) {
      console.log(err, err.stack)

      const rawdata = fs.readFileSync(
        path.join(__dirname, '../', 'data', 'modified', 'competitors.json'))
      const competitors = JSON.parse(rawdata)

      resolve(competitors)
    }
  })
}

function saveCompetitors (competitors) {
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

  return new Promise(async function (resolve) {
    try {
      await dynamoDB.batchWriteItem(params).promise()
    } catch (err) {
      console.log(err, err.stack)

      fs.writeFile(
        path.join(__dirname, '../', 'data', 'modified', 'competitors.json'),
        JSON.stringify(competitors), (error) => {
          // In case of a error throw err exception.
          if (error) {
            throw(error)
          }
      })
    } finally {
      resolve()
    }
  })
}

module.exports = {
  getCompetitors,
  saveCompetitors
}
