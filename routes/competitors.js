const competitorsDTO = require('../model/competitors')

// initialize
module.exports = function (router) {
  router.get('/competitors', getAllCompetitors)
  router.get('/competitors/:competitor_id', getCompetitors)
}

// APIs
async function getAllCompetitors (req, res) {
  try {
    const competitors = await competitorsDTO.getCompetitors()

    return res.status(200).json({
      body: competitors
    })
  } catch (err) {
    return res.status(502).json({
      message: 'something went wrong'
    })
  }
}

async function getCompetitors (req, res) {
  try {
    const competitors = await competitorsDTO.getCompetitors()
    const competitor = competitors.find(comp => comp.id === req.params.competitor_id)

    if (competitor) {
      return res.status(200).json({
        body: competitor
      })
    } else {
      return res.status(404).json({
        message: 'Invalid competitor id'
      })
    }
  } catch (err) {
    return res.status(502).json({
      message: 'something went wrong'
    })
  }
}
