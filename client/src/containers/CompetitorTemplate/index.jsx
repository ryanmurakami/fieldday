import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getAPI } from '../../helper.js'

import Heading from '../../component/Heading/index.jsx'
import Divider from '../../component/Divider/index.jsx'
import Stats from '../../component/Stats/index.jsx'
import List from '../../component/List/index.jsx'

import styles from './index.scss'

function CompetitorTemplate () {
  const [response, setResponse] = useState({ message: 'Oops, something went wrong...' })
  const { competitor_id } = useParams()

  useEffect(async () => {
    let mounted = true

    const res = await getAPI(`competitors/${competitor_id}`)
    if (mounted) setResponse(res)

    return () => mounted = false
  }, [])

  const competitor = response.body || {}

  return (
    <div className={`container ${styles.wrapper}`}>
      <Heading
        text={competitor.name}
      />
      <img className={styles.image} src={competitor.image} />
      <Divider text='Stats' />
      <div>
        {competitor.stats &&
          competitor.stats.map((stat, index) => {
            return (<Stats key={index} name={stat.key} rating={stat.value * 10} />)
          })}
      </div>
      <Divider text='Participating Event' />
      <List items={competitor.events} />
    </div>
  )
}

export default CompetitorTemplate
