import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import 'grd'
import styles from './index.scss'

import { getAPI } from '../../helper.js'

import Image from '../../component/Image/index.jsx'
import Divider from '../../component/Divider/index.jsx'
import Loader from '../../component/Loader/index.jsx'

function HomeContainer (props) {
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
  const inProgressEvent = _.get(response, 'body.inProgress') || {}
  const lastEvent = _.get(response, 'body.lastEvent') || {}
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

  return (
    <div className={styles.container}>
      <div className='Grid -middle'>
        <div className='Cell -5of12'>
          <h3 className={styles.title}>Event Progress</h3>
          <p className={styles.subtitle}>{inProgressEvent.name}</p>
          <Loader progress={inProgressEvent.progress} />
        </div>
        <div className={`Cell -2of12 ${styles.relative}`}>
          <div className={styles.vl} />
        </div>
        <div className='Cell -5of12'>
          <h3 className={styles.title}>Recent Event Winner</h3>
          <Image
            link='/'
            image={lastEvent.imageUrl}
            subtitle={lastEvent.name}
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

export default HomeContainer
