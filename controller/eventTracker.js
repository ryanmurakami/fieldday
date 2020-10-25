const fs = require('fs');
const path = require('path');
const IN_PROGRESS_EVENT = {}
const LAST_EVENT = {}

function get_inprogress_event() {
    return IN_PROGRESS_EVENT;
}

function get_last_event() {
    return LAST_EVENT;
}

function set_inprogress_event(event) {
    Object.assign(IN_PROGRESS_EVENT, event);
}

function set_last_event(event) {
    Object.assign(LAST_EVENT, event);
}

function run_inprogress_event(event) {
    set_inprogress_event(event);

    const modifier = IN_PROGRESS_EVENT.simulationTime/100;
    const interval = setInterval(() => {
        IN_PROGRESS_EVENT.progress += modifier

        if (IN_PROGRESS_EVENT.progress >= 100) {
            clearInterval(interval);

            const competitorResult = _generate_competitors_finisher();
            _update_competitor_result(competitorResult);
            _update_inprogress_event(competitorResult);
        }
    }, 1000);
}

function reset_event() {}

function _generate_competitors_finisher() {
    const minFinishedTime = IN_PROGRESS_EVENT.minFinishedTime;
    const maxFinishedTime = IN_PROGRESS_EVENT.maxFinishedTime;

    let rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    const competitors = JSON.parse(rawdata);
    const competitorsResult = [];

    for (const i in competitors) {
        const result = {
            "name": competitors[i].name,
            "image": competitors[i].image,
            "time": Math.floor(Math.random() * maxFinishedTime) + minFinishedTime
        }

        competitorsResult.push(result);
    }

    competitorsResult.sort((a, b) => a.time - b.time);

    return competitorsResult;
}

function _update_inprogress_event(result) {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'events.json'));
    const events = JSON.parse(rawdata);
    const event = events.find(e => e.id === IN_PROGRESS_EVENT.id);

    if (event) {
        event.completed = true;
        event.result = result;

        fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'events.json'), JSON.stringify(events), (error) => { 
            // In case of a error throw err exception. 
            if (error) {
                throw 'error saving event';
            };

            Object.assign(LAST_EVENT, {
                "name": event.name,
                "imageUrl": result[0].image
            });
        });
    }
}

function _update_competitor_result(result) {
    const rawdata = fs.readFileSync(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'));
    const competitors = JSON.parse(rawdata);

    for (const i in result) {
        const competitor = competitors.find(c => c.name === result[i].name);
        competitor.events.push({
            "name": IN_PROGRESS_EVENT.name,
            "rank": i,
            "time": result[i].time
        });
    }

    fs.writeFile(path.join(__dirname, '../', 'data', 'modified', 'competitors.json'), JSON.stringify(competitors), (error) => { 
        // In case of a error throw err exception. 
        if (error) {
            throw 'error saving event';
        };
    });
}

module.exports = {
    get_inprogress_event,
    get_last_event,
    set_inprogress_event,
    set_last_event,
    run_inprogress_event,
    reset_event
}