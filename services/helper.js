const AWS = require('aws-sdk')
const winston = require('winston')

function unmarshallArray (items) {
  const docConvert = AWS.DynamoDB.Converter
  const result = []

  for (const i in items) {
    result.push(docConvert.unmarshall(items[i]))
  }

  return result
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'ec2fieldday' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = {
  unmarshallArray,
  logger
}
