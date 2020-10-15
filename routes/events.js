const fs = require('fs');
const path = require('path');

//initialize
module.exports = function (router) {
    router.get('/events', get_all_events);
    router.get('/events/:event_id', get_events);
}

//APIs
function get_all_events(req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    let competitors = JSON.parse(rawdata);

    return res.status(200).json({
        body: competitors
    });
}

function get_events(req, res) {
    let rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    let events = JSON.parse(rawdata);
    let event = events.find(event => event.id == req.params.event_id);

    if (event) {
        return res.status(200).json({
            body: event
        });
    } else {
        return res.status(404).json({
            message: 'Invalid event id'
        });
    }
    
}