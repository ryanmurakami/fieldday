const AWS = require('aws-sdk')

function unmarshallArray (items) {
  const docConvert = AWS.DynamoDB.Converter
  const result = []

  for (const i in items) {
    result.push(docConvert.unmarshall(items[i]))
  }

  return result
}

module.exports = unmarshallArray
