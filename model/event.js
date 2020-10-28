const fs = require('fs');
const path = require('path');


function getEvents() {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    const events = JSON.parse(rawdata);

    return events;
}

function saveEvents(events, cb) {
    fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'events.json'), JSON.stringify(events), (error) => { 
        // In case of a error throw err exception. 
        if (error) {
            throw 'error saving event';
        };

        cb();
    });
}

module.exports = {
    getEvents,
    saveEvents
}