const fs = require('fs');
const path = require('path');

//initialize
module.exports = function (router) {
    router.get('/commands/:commands', command);
}

//APIs
function command(req, res) {
    if (req.params.commands == 'update') {
        return completeEvent(req, res);
    }
    return res.status(200).json({
        status: `get ${req.params.commands}`
    });
}

function completeEvent(req, res) {
    const eventId = req.query.eventId
    if (!eventId) {
        return res.status(502).json({
            status: 'event id required'
        });
    }
    let rawdata 
    
    rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    let competitors = JSON.parse(rawdata);

    rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    let events = JSON.parse(rawdata);

    // get event, marked as completed, generated random competitor time
    let event = events.find(event => event.id == eventId);
    let pos = events.map(function(e) { return e.id; }).indexOf('eventId');

    event.completed = true;
    event.result = _randomCompetitorsFinisher(competitors);
    // set back to events
    events[pos] = event;

    fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'events.json'), JSON.stringify(events), (error) => { 
        // In case of a error throw err exception. 
        if (error) {
            return res.status(502).json({
                status: 'error saving event'
            });
        }; 
    });
    // TODO: update individual competitor race stat

    return res.status(200).json({
        status: `${eventId} has been marked as completed`,
        body: {
            event_name: event.name,
            competitor_image: event.result[0].image
        }
    });
}

function _randomCompetitorsFinisher(competitors) {
    for (let i = competitors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [competitors[i], competitors[j]] = [competitors[j], competitors[i]];
    }
    // Todo: add "fake" timestamps
    return competitors;
}