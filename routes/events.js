const fs = require('fs');
const path = require('path');
const {
    get_inprogress_event,
    get_last_event,
    run_inprogress_event
} = require('../controller/eventTracker.js');

//initialize
module.exports = function (router) {
    router.get('/events', get_all_events);
    router.get('/events/:event_id', get_events);
    router.post('/events', start_event);
}

//APIs
function get_all_events(req, res) {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    const events = JSON.parse(rawdata);
    const result = {
        "allEvents": events,
        "inProgress": get_inprogress_event(),
        "lastEvent": get_last_event()
    }

    return res.status(200).json({
        body: result
    });
}

function get_events(req, res) {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    const events = JSON.parse(rawdata);
    const event = events.find(e => e.id == req.params.event_id);

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

function start_event(req, res) {
    run_inprogress_event(req.body);

    return res.status(200).json({
        message: `${req.body.name} has started`
    });
}