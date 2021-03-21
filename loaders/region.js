const AWS = require('aws-sdk')
const fetch = require('node-fetch')
const { logger } = require('../services/helper')

let region

async function load (app) {
  // try getting region from local AWS config file
  const config = new AWS.Config()
  if (config.region) {
    region = config.region
    app.set('awsRegion', region)
    logger.info(`AWS region set to ${region} from local config file.`)
    return
  }

  // try getting region from EC2 endpoint
  try {
    const res = await fetch(
      'http://169.254.169.254/latest/dynamic/instance-identity/document',
      {
        timeout: 2000
      })
    if (res.ok) {
      const body = await res.json()
      if (body.region) {
        region = body.region
        app.set('awsRegion', region)
        logger.info(`AWS region set to ${region} from EC2 instance metadata.`)
        return
      }
    }
  } catch (err) {
    console.error('Could not load EC2 metadata URL. Are you running locally without a config file?')
  }

  // set default region from .env
  region = process.env.DEFAULT_AWS_REGION
  app.set('awsRegion', region)
  logger.info(`AWS region set to ${region} from project .env file.`)
}

function get () {
  return region
}

module.exports = {
  get,
  load
}