const fs = require('fs');
const path = require('path');

//initialize
module.exports = function (router) {
    router.get('/competitors', get_all_competitor);
    router.get('/competitors/:competitor_id', get_competitor);
}

//APIs
function get_all_competitor(req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    let competitors = JSON.parse(rawdata);

    return res.status(200).json({
        body: competitors
    });
}

function get_competitor(req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    let competitors = JSON.parse(rawdata);
    let competitor = competitors.find(comp => comp.id == req.params.competitor_id);

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