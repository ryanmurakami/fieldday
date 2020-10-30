const competitorsDTO = require('../model/competitors');

//initialize
module.exports = function (router) {
    router.get('/competitors', getAllCompetitors);
    router.get('/competitors/:competitor_id', getCompetitors);
}

//APIs
async function getAllCompetitors(req, res) {
    const competitors = await competitorsDTO.getCompetitors();

    return res.status(200).json({
        body: competitors
    });
}

async function getCompetitors(req, res) {
    const competitors = await competitorsDTO.getCompetitors();
    const competitor = competitors.find(comp => comp.id === req.params.competitor_id);

    if (competitor) {
        return res.status(200).json({
            body: competitor
        });
    } else {
        return res.status(404).json({
            message: 'Invalid competitor id'
        });
    }
    
}