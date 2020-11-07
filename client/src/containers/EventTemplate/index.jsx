import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAPI } from '../../helper.js'

import Heading from '../../component/Heading/index.jsx'
import Divider from '../../component/Divider/index.jsx'
import List from '../../component/List/index.jsx'

import styles from './index.scss'

function EventTemplate (props) {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })
  const { event_id } = useParams()

  const url = `events/${event_id}`
  useEffect(() => {
    getAPI(url, setResponse)
  }, [])

  const event = response.body || {}

  return (
    <div className={`container ${styles.wrapper}`}>
      <Heading
        text={event.name}
      />
      <img src={event.image} />
      <Divider text='Event Result' />
      <List items={event.results} />
      {/* <ol className={styles['number-list']}>
        {event.results &&
                event.results.map(function (result, index) {
                  return (
                    <li key={index}>
                      {result.name} - {_renderTime(result.time)}
                    </li>
                  )
                })}
      </ol> */}
    </div>
  )
}

export default EventTemplate
