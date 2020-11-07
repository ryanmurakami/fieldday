import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAPI } from '../../helper.js'

import Heading from '../../component/Heading/index.jsx'
import Divider from '../../component/Divider/index.jsx'

import styles from './index.scss'

function CompetitorTemplate (props) {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })
  const { competitor_id } = useParams()

  const url = `competitors/${competitor_id}`
  useEffect(() => {
    getAPI(url, setResponse)
  }, [])

  const competitor = response.body || {}

  return (
    <div className={`container ${styles.wrapper}`}>
      <Heading
        text={competitor.name}
      />
      <img src={competitor.image} />
      <Divider text='Stats' />
      <div>
        TODO: create stats component
      </div>
      <Divider text='Participating Event' />
      <ol className={styles['number-list']}>
        {competitor.events &&
                competitor.events.map(function (result, index) {
                  return (
                    <li key={index}>
                      {result.name} - {result.rank} - {_renderTime(result.time)}
                    </li>
                  )
                })}
      </ol>
    </div>
  )
}

function _renderTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return <span>{minutes}:{seconds}</span>
}

export default CompetitorTemplate
