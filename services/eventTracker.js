var _ = require('lodash');
const eventsDTO = require('../model/event');
const competitorsDTO = require('../model/competitors');
const FIELD_DAY_EVENT = {
    "isRunning": false,
    "interval": null,
    "inProgressEvent": {},
    "lastEvent": {}
}

function getInProgressEvent() {
    return FIELD_DAY_EVENT.inProgressEvent;
}

function getLastEvent() {
    return FIELD_DAY_EVENT.lastEvent;
}

function setInProgressEvent(event) {
    Object.assign(FIELD_DAY_EVENT.inProgressEvent, event);
}

function setLastEvent(event) {
    Object.assign(FIELD_DAY_EVENT.lastEvent, event);
}

function runInProgressEvent(event) {
    Object.assign(FIELD_DAY_EVENT, {
        "isRunning": true
    });
    set_inprogress_event(event);

    const modifier = FIELD_DAY_EVENT.inProgressEvent.simulationTime/100;
    FIELD_DAY_EVENT.interval = setInterval(() => {
        FIELD_DAY_EVENT.inProgressEvent.progress += modifier

        if (FIELD_DAY_EVENT.inProgressEvent.progress >= 100) {
            clearInterval(FIELD_DAY_EVENT.interval);

            const competitorResult = _generateCompetitorsFinisher();
            _updateCompetitorsResult(competitorResult);
            _updateInProgressEvent(competitorResult);
        }
    }, 1000);
}

function resetEvent() {
    clearInterval(FIELD_DAY_EVENT.interval);

    Object.assign(FIELD_DAY_EVENT, {
        "isRunning": false,
        "interval": null,
        "inProgressEvent": {},
        "lastEvent": {}
    });
}

function startEvent() {
    if (!_.get(FIELD_DAY_EVENT, 'inProgressEvent.id')) {
        const events = eventsDTO.getEvents();
        const unfinishedEvent = events.filter(e => e.completed === false);
        const runEvent = unfinishedEvent[unfinishedEvent.length * Math.random() | 0];

        runInProgressEvent(runEvent);
    } else {
        runInProgressEvent(FIELD_DAY_EVENT.inProgressEvent);
    }
}

function stopEvent() {
    clearInterval(FIELD_DAY_EVENT.interval);
    Object.assign(FIELD_DAY_EVENT, {
        "isRunning": false,
        "interval": null,
    });
}

function _generateCompetitorsFinisher() {
    const minFinishedTime = FIELD_DAY_EVENT.inProgressEvent.minFinishedTime;
    const maxFinishedTime = FIELD_DAY_EVENT.inProgressEvent.maxFinishedTime;

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
    const event = events.find(e => e.id === FIELD_DAY_EVENT.inProgressEvent.id);

    if (event) {
        event.completed = true;
        event.results = result;

        eventsDTO.saveEvents(events, () => {
            Object.assign(FIELD_DAY_EVENT.lastEvent, {
                "name": event.name,
                "imageUrl": result[0].image
            });

            // Reset state
            Object.assign(FIELD_DAY_EVENT.inProgressEvent, {
                "id": "",
                "name": "",
                "progress": 0
            });
        });
    }
}

function _updateCompetitorsResult(result) {
    const competitors = competitorsDTO.getCompetitors();

    for (const i in result) {
        const competitor = competitors.find(c => c.name === result[i].name);
        competitor.events.push({
            "name": FIELD_DAY_EVENT.inProgressEvent.name,
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
    resetEvent,
    startEvent,
    stopEvent
}