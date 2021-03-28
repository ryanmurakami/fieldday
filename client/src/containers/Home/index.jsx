import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { get } from 'lodash'
import 'grd'
import styles from './index.scss'

import { getAPI } from '../../helper.js'

import Image from '../../component/Image/index.jsx'
import Divider from '../../component/Divider/index.jsx'
import Loader from '../../component/Loader/index.jsx'

function HomeContainer (props) {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })

  const url = 'events'
  useEffect(async () => {
    let mounted = true

    const res = await getAPI(url)
    if (mounted) setResponse(res)

    const interval = setInterval(async () => {
      const res = await getAPI(url)
      if (mounted) setResponse(res)
    }, 5000)
    // component will unmount
    return () => {
      // clear interval
      mounted = false
      clearInterval(interval)
    }
  }, [])

  const events = get(response, 'body.allEvents') || []
  const inProgressEvent = get(response, 'body.inProgress') || {}
  const lastEvent = get(response, 'body.lastEvent') || {}
  const unfinishedEvent = events.filter(e => e.completed === false)
  const renderEvents = unfinishedEvent.map(function (event, index) {
    return (
      <div key={index} className='Cell -3of12'>
        <Image
          className={styles.events}
          image={event.image}
          link={`/events/${event.id}`}
          subtitle={event.name}
        />
      </div>
    )
  })

  return (
    <div className={styles.container}>
      {(lastEvent.name || inProgressEvent.name) ?
        <div className={`Grid -middle ${styles.first}`}>
          <div className='Cell -5of12'>
            {_renderProgressBar(inProgressEvent)}
          </div>
          <div className={`Cell -2of12 ${styles.relative}`}>
            <div className={styles.vl} />
          </div>
          <div className='Cell -5of12'>
            {lastEvent.competitorId &&
              <>
                <h3 className={styles.title}>Recent Event Winner</h3>
                <Image
                  className={styles.image}
                  image={lastEvent.imageUrl}
                  link={`/competitors/${lastEvent.competitorId}`}
                />
                <div className={styles.eventSubtitle}>
                  <NavLink to={`/competitors/${lastEvent.competitorId}`}>
                    {lastEvent.competitorName}
                  </NavLink>
                    &nbsp;&nbsp;won at&nbsp;&nbsp;
                  <NavLink to={`/events/${lastEvent.eventId}`}>
                    {lastEvent.name}
                  </NavLink>
                </div>
              </>
            }
          </div>
        </div>
        :
        <></>
      }
      <Divider text="Upcoming Events" />
      <div className='Grid -middle'>
        {renderEvents}
      </div>
    </div>
  )
}

function _renderProgressBar(inProgressEvent) {
  if (inProgressEvent.name) {
    return (<div>
      <h3 className={styles.title}>Event Progress</h3>
      <p className={styles.subtitle}>
        <NavLink to={`/events/${inProgressEvent.id}`}>
          {inProgressEvent.name}
        </NavLink>
      </p>
      <Loader progress={inProgressEvent.progress} />
    </div>)
  }

  return <h3 className={styles.title}>No Events Running</h3>
}

export default HomeContainer
