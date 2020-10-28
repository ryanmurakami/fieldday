const eventsDTO = require('../model/event.js');
const competitorsDTO = require('../model/competitors.js');
const IN_PROGRESS_EVENT = {}
const LAST_EVENT = {}

function getInProgressEvent() {
    return IN_PROGRESS_EVENT;
}

function getLastEvent() {
    return LAST_EVENT;
}

function setInProgressEvent(event) {
    Object.assign(IN_PROGRESS_EVENT, event);
}

function setLastEvent(event) {
    Object.assign(LAST_EVENT, event);
}

function runInProgressEvent(event) {
    set_inprogress_event(event);

    const modifier = IN_PROGRESS_EVENT.simulationTime/100;
    const interval = setInterval(() => {
        IN_PROGRESS_EVENT.progress += modifier

        if (IN_PROGRESS_EVENT.progress >= 100) {
            clearInterval(interval);

            const competitorResult = _generateCompetitorsFinisher();
            _updateCompetitorsResult(competitorResult);
            _updateInProgressEvent(competitorResult);
        }
    }, 1000);
}

function resetEvent() {}

function _generateCompetitorsFinisher() {
    const minFinishedTime = IN_PROGRESS_EVENT.minFinishedTime;
    const maxFinishedTime = IN_PROGRESS_EVENT.maxFinishedTime;

    const competitors = competitorsDTO.getCompetitors()
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

function _updateInProgressEvent(result) {
    const events = eventsDTO.getEvents();
    const event = events.find(e => e.id === IN_PROGRESS_EVENT.id);

    if (event) {
        event.completed = true;
        event.results = result;

        eventsDTO.saveEvents(events, () => {
            Object.assign(LAST_EVENT, {
                "name": event.name,
                "imageUrl": result[0].image
            });

            // Reset state
            Object.assign(IN_PROGRESS_EVENT, {
                "id": "",
                "name": "",
                "progress": 0,
                "inProgress": false
            });
        });
    }
}

function _updateCompetitorsResult(result) {
    const competitors = competitorsDTO.getCompetitors();

    for (const i in result) {
        const competitor = competitors.find(c => c.name === result[i].name);
        competitor.events.push({
            "name": IN_PROGRESS_EVENT.name,
            "rank": i,
            "time": result[i].time
        });
    }

    competitorsDTO.saveCompetitors(competitors, () => {});
}

module.exports = {
    getInProgressEvent,
    getLastEvent,
    setInProgressEvent,
    setLastEvent,
    runInProgressEvent,
    resetEvent
}