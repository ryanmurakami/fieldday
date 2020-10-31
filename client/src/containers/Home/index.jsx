import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import 'grd'
import styles from './index.scss'

import { getAPI } from '../../helper.js'

import Image from '../../component/Image/index.jsx'
import Divider from '../../component/Divider/index.jsx'
import Loader from '../../component/Loader/index.jsx'

function HomeContainer (props) {
  const { event } = props

  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })

  const url = 'events'
  useEffect(() => {
    getAPI(url, setResponse)
    const interval = setInterval(() => {
      getAPI(url, setResponse)
    }, 5000)
    // component will unmount
    return () => {
      // clear interval
      clearInterval(interval)
    }
  }, [])

  const events = _.get(response, 'body.allEvents') || []
  const unfinishedEvent = events.filter(e => e.completed === false)
  const renderEvents = unfinishedEvent.map(function (event, index) {
    return (
      <div key={index} className='Cell -3of12'>
        <Image
          image={event.image}
          link={`/events/${event.id}`}
          subtitle={event.name}
        />
      </div>
    )
  })

  if (event) {
    const inProgressEvent = _.get(response, 'body.inProgress')
    const lastEvent = _.get(response, 'body.lastEvent')
    _updateFieldDay(event, inProgressEvent, lastEvent)
  }

  return (
    <div className={styles.container}>
      <div className='Grid -middle'>
        <div className='Cell -5of12'>
          <h3 className={styles.title}>Event Progress</h3>
          <p className={styles.subtitle}>{event.current.name}</p>
          <Loader progress={event.current.progress} />
        </div>
        <div className={`Cell -2of12 ${styles.relative}`}>
          <div className={styles.vl} />
        </div>
        <div className='Cell -5of12'>
          <h3 className={styles.title}>Recent Event Winner</h3>
          <Image
            link='/'
            image={event.last.imageUrl}
            subtitle={event.last.name}
          />
        </div>
      </div>
      <Divider text="Today's Event" />
      <div className='Grid -middle'>
        {renderEvents}
      </div>
    </div>
  )
}

function _updateFieldDay (event, inProgressEvent, lastEvent) {
  const newEvent = { ...event }

  if (inProgressEvent) {
    newEvent.current.id = inProgressEvent.id
    newEvent.current.name = inProgressEvent.name
    newEvent.current.progress = inProgressEvent.progress
    newEvent.current.inProgress = inProgressEvent.inProgress
  }

  if (lastEvent) {
    newEvent.last.name = lastEvent.name
    newEvent.last.imageUrl = lastEvent.imageUrl
  }
}

export default HomeContainer
