const AWS = require('aws-sdk')

async function checkInstances () {
  AWS.config.update({ region: 'us-east-2' })

  const ec2 = new AWS.EC2()
  const params = {}

  const response = await ec2.describeInstances(params).promise()
  console.log(response)
}

checkInstances()