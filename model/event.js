const fs = require('fs')
const path = require('path')

const { get: getDynamo, update: updateDynamo } = require('../services/dynamo')

async function getEvents () {
  try {
    const data = await getDynamo()
    return data.events
  } catch (err) {
    const rawdata = fs.readFileSync(
      path.join(__dirname, '../', 'data', 'modified', 'events.json'))
    const events = JSON.parse(rawdata)

    return events
  }
}

async function saveEvents (events) {
  try {
    await updateDynamo({ events })
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
