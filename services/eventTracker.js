const _ = require('lodash')
const eventsDTO = require('../model/event')
const competitorsDTO = require('../model/competitors')
const FIELD_DAY_EVENT = {
    isRunning: false,
    interval: null,
    inProgressEvent: {},
    lastEvent: {}
}

function getIsRunning () {
    return FIELD_DAY_EVENT.isRunning
}

function getInProgressEvent () {
    return FIELD_DAY_EVENT.inProgressEvent
}

function getLastEvent () {
    return FIELD_DAY_EVENT.lastEvent
}

function setInProgressEvent (event) {
    Object.assign(FIELD_DAY_EVENT.inProgressEvent, event)
}

function setLastEvent (event) {
    Object.assign(FIELD_DAY_EVENT.lastEvent, event)
}

function runInProgressEvent (event) {
    Object.assign(FIELD_DAY_EVENT, {
        isRunning: true
    })
    setInProgressEvent(event)

    const modifier = FIELD_DAY_EVENT.inProgressEvent.simulationTime / 100
    FIELD_DAY_EVENT.interval = setInterval(async function () {
        FIELD_DAY_EVENT.inProgressEvent.progress += modifier

        if (FIELD_DAY_EVENT.inProgressEvent.progress >= 100) {
            clearInterval(FIELD_DAY_EVENT.interval)

            const competitorResult = await _generateCompetitorsFinisher()
            _updateCompetitorsResult(competitorResult)
            _updateInProgressEvent(competitorResult)
        }
    }, 1000)
}

function resetEvent () {
    clearInterval(FIELD_DAY_EVENT.interval)

    Object.assign(FIELD_DAY_EVENT, {
        isRunning: false,
        interval: null,
        inProgressEvent: {},
        lastEvent: {}
    })
}

async function startEvent () {
    if (!_.get(FIELD_DAY_EVENT, 'inProgressEvent.id')) {
        const runEvent = await _selectRandomEvent()
        if (runEvent) {
            runInProgressEvent(runEvent)
        }
    } else {
        runInProgressEvent(FIELD_DAY_EVENT.inProgressEvent)
    }
}

function stopEvent () {
    clearInterval(FIELD_DAY_EVENT.interval)
    Object.assign(FIELD_DAY_EVENT, {
        isRunning: false,
        interval: null
    })
}

async function _generateCompetitorsFinisher () {
    return new Promise(async function (resolve) {
        const minFinishedTime = FIELD_DAY_EVENT.inProgressEvent.minFinishedTime
        const maxFinishedTime = FIELD_DAY_EVENT.inProgressEvent.maxFinishedTime

        const competitors = await competitorsDTO.getCompetitors()
        const competitorsResult = []

        for (const i in competitors) {
            const result = {
                name: competitors[i].name,
                image: competitors[i].image,
                time: Math.floor(Math.random() * maxFinishedTime) + minFinishedTime
            }

            competitorsResult.push(result)
        }

        competitorsResult.sort((a, b) => a.time - b.time)

        resolve(competitorsResult)
    })
}

async function _updateInProgressEvent (result) {
    const events = await eventsDTO.getEvents()
    const event = events.find(e => e.id === FIELD_DAY_EVENT.inProgressEvent.id)

    if (event) {
        event.completed = true
        event.results = result

        eventsDTO.saveEvents(events).then(async function () {
            Object.assign(FIELD_DAY_EVENT.lastEvent, {
                name: event.name,
                imageUrl: result[0].image
            })

            // Reset state
            Object.assign(FIELD_DAY_EVENT.inProgressEvent, {
                id: '',
                name: '',
                progress: 0
            })

            const runEvent = await _selectRandomEvent()
            if (runEvent) {
                runInProgressEvent(runEvent)
            } else {
                console.log('No More Event to run!')
            }
        })
    }
}

async function _updateCompetitorsResult (result) {
    const competitors = await competitorsDTO.getCompetitors()

    for (const i in result) {
        const competitor = competitors.find(c => c.name === result[i].name)
        competitor.events.push({
            name: FIELD_DAY_EVENT.inProgressEvent.name,
            rank: i,
            time: result[i].time
        })
    }

    competitorsDTO.saveCompetitors(competitors).then(() => {})
}

async function _selectRandomEvent () {
    return new Promise(async function(resolve) {
        const events = await eventsDTO.getEvents()
        const unfinishedEvent = events.filter(e => e.completed === false)
        if (unfinishedEvent.length > 0) {
            resolve(unfinishedEvent[unfinishedEvent.length * Math.random() | 0])
        }

        resolve(null)
    }) 
}

module.exports = {
    getIsRunning,
    getInProgressEvent,
    getLastEvent,
    setInProgressEvent,
    setLastEvent,
    runInProgressEvent,
    resetEvent,
    startEvent,
    stopEvent
}
