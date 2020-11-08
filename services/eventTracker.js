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

      try {
        const competitorResult = await _generateCompetitorsFinisher()
        await _updateCompetitorsResult(competitorResult)
        await _updateInProgressEvent(competitorResult)
      } catch (err) {
        console.log(`fail to update database with: ${err}`)
      }
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
  try {
    if (!_.get(FIELD_DAY_EVENT, 'inProgressEvent.id')) {
      const runEvent = await _selectRandomEvent()
      if (runEvent) {
        runInProgressEvent(runEvent)
      }
    } else {
      runInProgressEvent(FIELD_DAY_EVENT.inProgressEvent)
    }
  } catch (err) {
    console.log(err)
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
  const minFinishedTime = FIELD_DAY_EVENT.inProgressEvent.minFinishedTime
  const maxFinishedTime = FIELD_DAY_EVENT.inProgressEvent.maxFinishedTime

  try {
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

    return competitorsResult
  } catch (err) {
    console.log(err)
    return []
  }
}

async function _updateInProgressEvent (result) {
  try {
    const events = await eventsDTO.getEvents()
    const event = events.find(e => e.id === FIELD_DAY_EVENT.inProgressEvent.id)

    if (event) {
      event.completed = true
      event.results = result

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

      await eventsDTO.saveEvents(events)
      const runEvent = await _selectRandomEvent()
      if (runEvent) {
        runInProgressEvent(runEvent)
      } else {
        console.log('No More Event to run!')
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    return null
  }
}

async function _updateCompetitorsResult (result) {
  try {
    const competitors = await competitorsDTO.getCompetitors()

    for (const i in result) {
      const competitor = competitors.find(c => c.name === result[i].name)
      const event = competitor.events.find(e => e.name === FIELD_DAY_EVENT.inProgressEvent.name)
      
      event.rank = parseInt(i) + 1
      event.time = result[i].time
    }

    await competitorsDTO.saveCompetitors(competitors)
  } catch (err) {
    console.log(err)
  } finally {
    return null
  }
}

async function _selectRandomEvent () {
  const events = await eventsDTO.getEvents()
  const unfinishedEvent = events.filter(e => e.completed === false)
  if (unfinishedEvent.length > 0) {
    return unfinishedEvent[unfinishedEvent.length * Math.random() | 0]
  }

  return null
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
