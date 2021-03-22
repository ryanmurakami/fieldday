const fs = require('fs')
const path = require('path')

const { get: getDynamo, update: updateDynamo } = require('../services/dynamo')

async function getCompetitors () {
  try {
    const data = await getDynamo()
    return data.competitors
  } catch (err) {
    const rawdata = fs.readFileSync(
      path.join(__dirname, '../', 'data', 'modified', 'competitors.json'))
    const competitors = JSON.parse(rawdata)

    return competitors
  }
}

async function saveCompetitors (competitors) {
  try {
    await updateDynamo({ competitors })
  } catch (err) {
    console.error('Error updating dynamo', err)
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
