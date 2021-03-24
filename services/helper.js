const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2' })
const winston = require('winston')

function unmarshallArray (items) {
  const docConvert = AWS.DynamoDB.Converter
  const result = []

  for (const i in items) {
    result.push(docConvert.unmarshall(items[i]))
  }

  return result
}

function unmarshallItem (item) {
  const docConvert = AWS.DynamoDB.Converter
  
  return docConvert.unmarshall(item)
}

async function getRedisConfig () {
  logger.info('Fetching redis config')

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
    const item = unmarshallItem(result.Item)
    return item.config
  } catch (err) {
    logger.error(`error fetching redis: ${err}`)
    return {}
  }
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
  unmarshallItem,
  getRedisConfig,
  logger
}
